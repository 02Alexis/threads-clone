import User from "../models/UseModel.js";
import Post from "../models/postModel.js";

const getPost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ error: "Publicación no encontrada" });
    }

    res.status(200).json({ post });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const createPost = async (req, res) => {
  try {
    const { postedBy, text, img } = req.body;

    if (!postedBy || !text) {
      return res.status(400).json({
        error: "Los campos Publicado por y de texto son obligatorios.",
      });
    }

    const user = await User.findById(postedBy);
    if (!user) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    if (user._id.toString() !== req.user._id.toString()) {
      return res
        .status(401)
        .json({ error: "No autorizado para crear publicación" });
    }

    const maxLength = 500;
    if (text.length > maxLength) {
      return res
        .status(400)
        .json({ error: `El texto debe ser menor que ${maxLength} caracteres` });
    }

    const newPost = new Post({ postedBy, text, img });
    await newPost.save();

    res
      .status(201)
      .json({ message: "publicación creada exitosamente", newPost });
  } catch (err) {
    res.status(500).json({ error: err.message });
    console.log(err);
  }
};

const deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ error: "Publicación no encontrada" });
    }

    if (post.postedBy.toString() !== req.user._id.toString()) {
      return res
        .status(401)
        .json({ error: "No autorizado para eliminar publicación" });
    }

    await Post.findByIdAndDelete(req.params.id);

    res.status(200).json({ message: "Publicación eliminada exitosamente" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const likeUnlikePost = async (req, res) => {
  try {
    const { id: postId } = req.params;
    const userId = req.user._id;

    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).json({ error: "Publicación no encontrada" });
    }

    const userLikedPost = post.likes.includes(userId);

    if (userLikedPost) {
      // A diferencia de la publicación
      await Post.updateOne({ _id: postId }, { $pull: { likes: userId } });
      res
        .status(200)
        .json({ message: "La publicación se ha desmarcado correctamente" });
    } else {
      // Me gusta la publicación
      post.likes.push(userId);
      await post.save();
      res.status(200).json({ message: "Publicacion marcada correctamente" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const replyToPost = async (req, res) => {
  try {
    const { text } = req.body;
    const postId = req.params.id;
    const userId = req.user._id;
    const userProfilePic = req.user.profilePic;
    const username = req.user.username;

    if (!text) {
      return res
        .status(400)
        .json({ error: "El campo de texto es obligatorio" });
    }

    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ error: "Publicación no encontrada" });
    }

    const reply = { userId, text, userProfilePic, username };

    post.replies.push(reply);
    await post.save();

    res.status(200).json({ message: "respuesta agregada exitosamente", reply });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export { createPost, getPost, deletePost, likeUnlikePost, replyToPost };

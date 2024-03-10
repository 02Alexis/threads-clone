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

export { createPost, getPost };

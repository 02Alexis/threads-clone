import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { useParams } from "react-router-dom";
import {
  Avatar,
  Box,
  Button,
  Divider,
  Flex,
  Image,
  Spinner,
  Text,
} from "@chakra-ui/react";
import { DeleteIcon } from "@chakra-ui/icons";
import { formatDistanceToNow } from "date-fns";
import Actions from "../components/Actions";
import Comment from "../components/Comment";
import useGetUserProfile from "../hooks/useGetUserProfile";
import useShowToast from "../hooks/useShowToast";
import userAtom from "../atoms/userAtom";

const PostPage = () => {
  const { user, loading } = useGetUserProfile();
  const [post, setPost] = useState(null);
  const showToast = useShowToast();
  const { pid } = useParams();
  const currentUser = useRecoilValue(userAtom);

  useEffect(() => {
    const getPost = async () => {
      try {
        const res = await fetch(`/api/posts/${pid}`);
        const data = await res.json();

        if (data.error) {
          showToast("Error", data.error, "error");
          return;
        }
        console.log(data);
        setPost(data);
      } catch (error) {
        showToast("Error", error.message, "error");
      }
    };

    getPost();
  }, [showToast, pid, setPost]);

  if (!user && loading) {
    return (
      <Flex justifyContent={"center"}>
        <Spinner size={"xl"} />
      </Flex>
    );
  }

  if (!post) return null;

  return (
    <>
      <Flex>
        <Flex w={"full"} alignItems={"center"} gap={3}>
          <Avatar src={user.profilePic} size={"md"} name={user.name} />
          <Flex>
            <Text fontSize={"sm"} fontWeight={"bold"}>
              {user.username}
            </Text>
            <Image src="/verified.png" w="4" h={4} ml={4} />
          </Flex>
        </Flex>

        <Flex gap={4} alignItems={"center"}>
          <Text
            fontSize={"xs"}
            width={36}
            textAlign={"right"}
            color={"gray.light"}
          >
            {formatDistanceToNow(new Date(post.createdAt))} ago
          </Text>
          {currentUser?._id === user._id && (
            <DeleteIcon size={20} cursor={"pointer"} />
          )}
        </Flex>
      </Flex>

      <Text my={3}>{post.text}</Text>

      {post.img && (
        <Box
          borderRadius={6}
          overflow={"hidden"}
          border={"1px solid"}
          borderColor={"gray.light"}
        >
          <Image src={post.img} w={"full"} />
        </Box>
      )}

      <Flex gap={3} my={3}>
        <Actions post={post} />
      </Flex>

      <Divider my={4} />

      <Flex justifyContent={"space-between"}>
        <Flex gap={2} alignItems={"center"}>
          <Text fontSize={"2xl"}>👋</Text>
          <Text color={"gray.light"}>
            Haz que la aplicación dé me gusta, responda y publique.
          </Text>
        </Flex>
        <Button>Conseguir</Button>
      </Flex>
      <Divider my={4} />

      {/* <Comment
        comment="¡Luce realmente bien!"
        createdAt="2d"
        likes={100}
        username="kazuto"
        userAvatar="https://bit.ly/dan-abramov"
      /> */}
    </>
  );
};

export default PostPage;

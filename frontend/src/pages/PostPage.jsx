import { useState } from "react";
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
import { BsThreeDots } from "react-icons/bs";
import Actions from "../components/Actions";
import Comment from "../components/Comment";

const PostPage = () => {
  const [liked, setLiked] = useState(false);

  return (
    <>
      <Flex>
        <Flex w={"full"} alignItems={"center"} gap={3}>
          <Avatar src="/avatar.jpg" size={"md"} name="Mark Zuckerberg" />
          <Flex>
            <Text fontSize={"sm"} fontWeight={"bold"}>
              elonmusk's
            </Text>
            <Image src="/verified.png" w="4" h={4} ml={4} />
          </Flex>
        </Flex>

        <Flex gap={4} alignItems={"center"}>
          <Text fontSize={"sm"} color={"gray.light"}>
            1d
          </Text>
          <BsThreeDots />
        </Flex>
      </Flex>

      <Text my={3}>Hablemos de hilos.</Text>
      <Box
        borderRadius={6}
        overflow={"hidden"}
        border={"1px solid"}
        borderColor={"gray.light"}
      >
        <Image src={"/post1.jpg"} w={"full"} />
      </Box>

      <Flex gap={3} my={3}>
        <Actions liked={liked} setLiked={setLiked} />
      </Flex>

      <Flex gap={2} alignItems={"center"}>
        <Text color={"gray.light"} fontSize="sm">
          234 Respuestas
        </Text>
        <Box w={0.5} h={0.5} borderRadius={"full"} bg={"gray.light"}></Box>
        <Text color={"gray.light"} fontSize="sm">
          {200 + (liked ? 1 : 0)} Me gusta
        </Text>
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

      <Comment
        comment="¡Luce realmente bien!"
        createdAt="2d"
        likes={100}
        username="kazuto"
        userAvatar="https://bit.ly/dan-abramov"
      />
      <Comment
        comment="¡Oye, esto se ve genial!"
        createdAt="1d"
        likes={34}
        username="John doe"
        userAvatar="https://bit.ly/sage-adebayo"
      />
      <Comment
        comment="Asombroso"
        createdAt="2h"
        likes={45}
        username="Yaela"
        userAvatar="https://bit.ly/prosper-baba"
      />
    </>
  );
};

export default PostPage;

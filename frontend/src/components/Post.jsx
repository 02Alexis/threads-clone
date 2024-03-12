import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Avatar } from "@chakra-ui/avatar";
import { Image } from "@chakra-ui/image";
import { Box, Flex, Text } from "@chakra-ui/layout";
import Actions from "./Actions";
import useShowToast from "../hooks/useShowToast";

const Post = ({ post, postedBy }) => {
  const [liked, setLiked] = useState(false);
  const showToast = useShowToast();

  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await fetch("/api/users/profile/" + postedBy);
        const data = await res.json();
        console.log(data);
        if (data.error) {
          showToast("Error", data.error, "error");
          return;
        }
      } catch (error) {
        showToast("Error", error.message, "error");
      }
    };

    getUser();
  }, [postedBy, showToast]);

  return (
    <Link to={`/alexis/post/1`}>
      <Flex gap={3} mb={4} py={5}>
        <Flex flexDirection={"column"} alignItems={"center"}>
          <Avatar size="md" name="as" src="/avatar.jpg" />
          <Box w="1px" h={"full"} bg="gray.light" my={2}></Box>
          <Box position={"relative"} w={"full"}>
            0 <Text textAlign={"center"}>🥱</Text>
            <Avatar
              size="xs"
              name="John doe"
              src="/avatar.jpg"
              position={"absolute"}
              top={"0px"}
              left="15px"
              padding={"2px"}
            />
            <Avatar
              size="xs"
              name="alex"
              src="/avatar.jpg"
              position={"absolute"}
              bottom={"0px"}
              right="-5px"
              padding={"2px"}
            />
            <Avatar
              size="xs"
              name="alex"
              src="/avatar.jpg"
              position={"absolute"}
              bottom={"0px"}
              left="4px"
              padding={"2px"}
            />
          </Box>
        </Flex>
        <Flex flex={1} flexDirection={"column"} gap={2}>
          <Flex justifyContent={"space-between"} w={"full"}>
            <Flex w={"full"} alignItems={"center"}>
              <Text fontSize={"sm"} fontWeight={"bold"}>
                adsasa
              </Text>
              <Image src="/verified.png" w={4} h={4} ml={1} />
            </Flex>
            <Flex gap={4} alignItems={"center"}>
              <Text
                fontSize={"xs"}
                width={36}
                textAlign={"right"}
                color={"gray.light"}
              >
                1 ago
              </Text>
            </Flex>
          </Flex>

          <Text fontSize={"sm"}>{post.text}</Text>
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

          <Flex gap={3} my={1}>
            <Actions liked={liked} setLiked={setLiked} />
          </Flex>

          <Flex gap={2} alignItems={"center"}>
            <Text color={"gray.light"} fontSize="sm">
              {post.replies.length} respuestas
            </Text>
            <Box w={0.5} h={0.5} borderRadius={"full"} bg={"gray.light"}></Box>
            <Text color={"gray.light"} fontSize="sm">
              {post.likes.length} me gusta
            </Text>
          </Flex>
        </Flex>
      </Flex>
    </Link>
  );
};

export default Post;

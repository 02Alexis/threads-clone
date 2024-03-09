import { useState } from "react";
import { Avatar, Divider, Flex, Text } from "@chakra-ui/react";
import { BsThreeDots } from "react-icons/bs";
import Actions from "./Actions";

const Comment = () => {
  const [liked, setLiked] = useState(false);

  return (
    <>
      <Flex gap={4} py={2} my={2} w={"full"}>
        <Avatar src="/avatar.jpg" size={"sm"} />
        <Flex gap={1} w={"full"} flexDirection={"column"}>
          <Flex
            w={"full"}
            justifyContent={"space-between"}
            alignItems={"center"}
          >
            <Text fontSize="sm" fontWeight="bold">
              elonmusk's
            </Text>
            <Flex gap={4} alignItems={"center"}>
              <Text fontSize={"sm"} color={"gray.light"}>
                1d
              </Text>
              <BsThreeDots />
            </Flex>
          </Flex>
          <Text>¡Oye, esto se ve genial!</Text>
          <Actions liked={liked} setLiked={setLiked} />
          <Text color={"gray.light"} fontSize="sm">
            {200 + (liked ? 1 : 0)} Me gusta
          </Text>
        </Flex>
      </Flex>
      <Divider my={4} />
    </>
  );
};

export default Comment;

import { Flex, useColorModeValue, Avatar, Text, Image, Divider, Skeleton, SkeletonCircle } from "@chakra-ui/react";
import Message from "./Message";
import MessageInput from "./MessageInput";

function MessageContainer() {
  return (
    <Flex
      flex="70"
      bg={useColorModeValue("gray.200", "gray.dark")}
      borderRadius={"md"}
      p={2}
      flexDirection={"column"}
    >
      {/* Message header */}
      <Flex w={"full"} h={12} alignItems={"center"} gap={2}>
        <Avatar src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS9gfoI56xriQfclLy0E7e831RBfKlvr8-r5A&s' size={"sm"} />
        <Text display={"flex"} alignItems={"center"}>
          Jazmin
          <Image src="/verified.png" w={4} h={4} ml={1} />
        </Text>
      </Flex>

      <Divider />

      <Flex
        flexDir={"column"}
        gap={4}
        my={4}
        p={2}
        height={"400px"}
        overflowY={"auto"}
      >
        {false &&
          [...Array(5)].map((_, i) => (
            <Flex
              key={i}
              gap={2}
              alignItems={"center"}
              p={1}
              borderRadius={"md"}
              alignSelf={i % 2 === 0 ? "flex-start" : "flex-end"}
            >
              {i % 2 === 0 && <SkeletonCircle size={7} />}
              <Flex flexDir={"column"} gap={2}>
                <Skeleton h="8px" w="250px" />
                <Skeleton h="8px" w="250px" />
                <Skeleton h="8px" w="250px" />
              </Flex>
              {i % 2 !== 0 && <SkeletonCircle size={7} />}
            </Flex>
          ))}

            <Flex
              direction={"column"}
            >
              <Message ownMessage={true} />
              <Message ownMessage={false} />
            </Flex>
      </Flex>

      <MessageInput />
    </Flex>
  );
}

export default MessageContainer;

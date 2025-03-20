import { Avatar, Box, Flex, Text } from "@chakra-ui/react";
import { BsCheck2All } from "react-icons/bs";

function Message({ ownMessage }) {
  return (
    <>
      {ownMessage ? (
        <Flex gap={2} alignSelf={"flex-end"}>
          <Flex bg={"green.800"} maxW={"350px"} p={1} borderRadius={"md"}>
            <Text color={"white"}>mensaje</Text>
            <Box alignSelf={"flex-end"} ml={1} fontWeight={"bold"}>
              <BsCheck2All size={16} />
            </Box>
          </Flex>
          <Avatar
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS9gfoI56xriQfclLy0E7e831RBfKlvr8-r5A&s"
            w="7"
            h={7}
          />
        </Flex>
      ) : (
        <Flex gap={2}>
          <Avatar src="" w="7" h={7} />
          <Text maxW={"350px"} bg={"gray.400"} p={1} borderRadius={"md"} color={"black"}>mensaje</Text>
        </Flex>
      )}
    </>
  );
}

export default Message;

import {
  Flex,
  Input,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import { IoSendSharp } from "react-icons/io5";
import { BsFillImageFill } from "react-icons/bs";

function MessageInput() {
  return (
    <Flex gap={2} alignItems={"center"}>
      <form style={{ flex: 95 }}>
        <InputGroup>
          <Input
            w={"full"}
            placeholder="Escriba un mensaje"
          />
          <InputRightElement  cursor={"pointer"}>
            <IoSendSharp />
          </InputRightElement>
        </InputGroup>
      </form>
      <Flex flex={5} cursor={"pointer"}>
        <BsFillImageFill size={20} />
        <Input
          type={"file"}
          hidden
        />
      </Flex>
    </Flex>
  );
}

export default MessageInput;

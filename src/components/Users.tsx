import React, { InputHTMLAttributes } from "react";
import NextLink from "next/link";
import { Box, StatGroup, Stat, StatLabel, StatNumber, Link, Heading, Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalCloseButton, ModalFooter, useDisclosure} from "@chakra-ui/core";
import UpdateUser from "./UpdateUser";
import { useUserQuery } from "../generated/graphql";
interface Users {
  firstName: string
  lastName: string
  min: number
  max: number
  index: number
  id: number
}
type UserFruitsProps = InputHTMLAttributes<HTMLInputElement> & {
 user: Users
 onModalClose: () => void
};

export const Users: React.FC<UserFruitsProps> = ({user, onModalClose}) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [{data, fetching}] = useUserQuery();
  const finalRef = React.useRef(null)
  const onModalClosed = () => {
    onModalClose()
    onClose()
  }
  return (
    <>
    <Box
      bg="#3362FF"
      alignItems="center"
      m={2}
      w="100%"
      p={4}
      color="white"
      key={user.index}
    >
      <StatGroup>
        <Stat>
          <StatLabel>Name</StatLabel>
          <StatNumber>{`${user.firstName} ${user.lastName} `}</StatNumber>
        </Stat>
        <Stat>
          <StatLabel>Minimum Fruits</StatLabel>
          <StatNumber>{user.min}</StatNumber>
        </Stat>

        <Stat>
          <StatLabel>Maximum Fruits</StatLabel>
          <StatNumber>
            {user.max}
          </StatNumber>
        </Stat>
        <Box flex={1}>
          <NextLink href="/fruitPreferences/[id]" as={`/fruitPreferences/${user.id}`}>
            <Link>
              <Heading fontSize="xl">View Fruit preferences</Heading>
            </Link>
          </NextLink>
        </Box>
        {data?.user.isAdmin && (
        <Button color="black" ml={2} mt={4} onClick={onOpen}>
            Edit
          </Button>
        )}
          <Modal size="xl" finalFocusRef={finalRef} isOpen={isOpen} onClose={onModalClosed}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Add Fruit Preferences</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <UpdateUser min={user.min} max={user.max} userId={user.id} onClose={onModalClosed}/>
            </ModalBody>

            <ModalFooter>
              <Button mr={3} onClick={onClose}>
                Close
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </StatGroup>
    </Box>
  </>
  );
};
import { Box, Button, Flex, Heading, Link, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure } from "@chakra-ui/core"
import NextLink from "next/link";
import { useUserQuery, useLogoutMutation } from '../generated/graphql';
import router, { useRouter } from 'next/router'
import React from "react";
import CreateFruits from "./CreateFruits";

interface NavBarProps {

}

export const NavBar: React.FC<NavBarProps> = ({}) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const finalRef = React.useRef(null)

    const [ {fetching: logoutFetching}, logout] = useLogoutMutation();
    const [{data, fetching}] = useUserQuery();
    let navBody = null;

    if(fetching) {
    } else if(!data?.user){
        navBody = (
            <>
                <NextLink href="/login">
                    <Link color='#FEEBC8' mr={2}>Login</Link>
                </NextLink>
                <NextLink href="/register">
                    <Link color='#FEEBC8' mr={2}>Register</Link>
                </NextLink>
            </>
        )
    } else {
        navBody = (
          <>
            <Flex align="center">
                <Button onClick={onOpen} mr={4}>
                  Add Fruits 
                </Button>

              <Box mr={2} color="white">
                Welcome {data.user.username}
              </Box>

              <Button
                onClick={async () => {
                  await logout();
                  router.push("/");
                }}
                isLoading={logoutFetching}
                variant="link"
              >
                logout
              </Button>
            </Flex>
          </>
        );
    }

    return (
      <>
      <Modal finalFocusRef={finalRef} isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Add Fruits</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <CreateFruits onClose={onClose}/>
        </ModalBody>

        <ModalFooter>
          <Button  mr={3} onClick={onClose}>
            Close
          </Button>
          {/* <Button variant='ghost'>Secondary Action</Button> */}
        </ModalFooter>
      </ModalContent>
    </Modal>
        <Flex zIndex={1} position="sticky" top={0} bg="#652B19" p={4}>
        <Flex flex={1} m="auto" align="center" maxW={800}>
          <NextLink href="/">
            <Link>
              {/* <Heading color="white">Donations.ca</Heading> */}
            </Link>
          </NextLink>
          <Box ml={"auto"}>{navBody}</Box>
        </Flex>
      </Flex>
      </>

)
}
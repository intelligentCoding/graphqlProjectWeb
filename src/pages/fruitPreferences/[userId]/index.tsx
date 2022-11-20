import { Badge, Box, Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Spinner, Stack, useDisclosure } from "@chakra-ui/core";
import { GetServerSideProps, NextPage } from "next";
import router, { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { fetchExchange } from "urql";
import CreateUserPreferences from "../../../components/CreateUserPreferences";
import { NavBar } from "../../../components/Navbar";
import { PageWrapper } from "../../../components/PageWrapper";
import { UserFruit } from "../../../components/UserFruit";
import { useUserFruitByIdQuery, useUserQuery } from "../../../generated/graphql";

const UserFruitPreferences: NextPage = () => {
  const router = useRouter()
  const [{ data: userData, fetching: userFetching }] = useUserQuery();
  const { isOpen, onOpen, onClose } = useDisclosure()
  const finalRef = React.useRef(null)
  const intId =
    typeof router.query.userId === "string" ? parseInt(router.query.userId) : -1;
  const [{ data, fetching }, executeQuery] = useUserFruitByIdQuery({
    pause: intId === -1, //pass the query if id is -1
    variables: {
      id: intId,
    },
    requestPolicy: 'network-only'
  })
  useEffect(() => {
    if (userData?.user.user === null) {
      router.push("/login");
    }
  }, [userFetching, userData, router]);

  const [totalMinMax, setTotalMinMax] = useState<{ max: number, min: number }>({ max: 0, min: 0 })


  const onModalClose = () => {
    onClose()
    executeQuery()
  }

  useEffect(() => {
    const total = data?.fruitsUsers?.reduce((acc, item) => {
      acc.max += item.max
      acc.min += item.min
      return acc
    }, { max: 0, min: 0 })
    if (total) {
      setTotalMinMax(total)
    }
  }, [data])

  if (fetching && userFetching) {
    return <Spinner />
  }
  console.log(data?.fruitsUsers.length === 0)

  return (
    <>

      <NavBar />
      <PageWrapper>
        <Box ref={finalRef} tabIndex={-1}>
        </Box>
        {userData?.user.isAdmin && (
          <Button ml={2} mt={4} onClick={onOpen}>
            Add Preferences
          </Button>
        )}
        {userData?.user.isAdmin && (
                <>
                <PageWrapper>
                  <Stack>
                    <Badge variantColor="red" fontSize="18">There are no preferences for this user</Badge>
                  </Stack>
                </PageWrapper>
              </>
        )}
        <Modal size="xl" finalFocusRef={finalRef} isOpen={isOpen} onClose={onModalClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Add Fruit Preferences</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <CreateUserPreferences totalMinMax={totalMinMax} onClose={onModalClose} userId={intId} />
            </ModalBody>

            <ModalFooter>
              <Button mr={3} onClick={onClose}>
                Close
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
        {data?.fruitsUsers && data?.fruitsUsers?.map((f) => {
          return <UserFruit key={f.id} id={f.id} userId={f.user.id} fruitName={f.fruits.Fruitsname} fruitId={f.fruits.id} min={f.min} max={f.max} />
        })
        }
      </PageWrapper>
    </>
  )
}

export default UserFruitPreferences
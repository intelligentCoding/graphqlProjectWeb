import { Box, Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Spinner, useDisclosure } from "@chakra-ui/core";
import { GetServerSideProps, NextPage } from "next";
import router, { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import CreateUserPreferences from "../../../components/CreateUserPreferences";
import { NavBar } from "../../../components/Navbar";
import { PageWrapper } from "../../../components/PageWrapper";
import { UserFruit } from "../../../components/UserFruit";
import { useFruitsUsersQuery, useUserFruitByIdQuery, useUserQuery } from "../../../generated/graphql";

const UserFruitPreferences: NextPage = () => {

  const router = useRouter()
  const [{ data: userData, fetching: userFetching }] = useUserQuery();

  useEffect(() => {
    if (userData?.user === null) {
      router.push("/login");
    }
  }, [userFetching, userData, router]);
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [totalMinMax, setTotalMinMax] = useState<{ max: number, min: number }>({ max: 0, min: 0 })

  const finalRef = React.useRef(null)
  const intId =
    typeof router.query.userId === "string" ? parseInt(router.query.userId) : -1;
  const [{ data, fetching }] = useUserFruitByIdQuery({
    pause: intId === -1, //pass the query if id is -1
    variables: {
      id: intId,
    },
  })
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
  if(!data) {
    return (
      <p>There are no fruits preferences available for the user. Please add them.</p>
    )
  }

  return (
    <>
    
      <NavBar />
      <PageWrapper>
        <Box ref={finalRef} tabIndex={-1}>
        </Box>

        <Button ml={2} mt={4} onClick={onOpen}>
          Add Preferences
        </Button>
        <Modal size="xl" finalFocusRef={finalRef} isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Add Fruit Preferences</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <CreateUserPreferences totalMinMax={totalMinMax} onClose={onClose} userId={intId} />
            </ModalBody>

            <ModalFooter>
              <Button mr={3} onClick={onClose}>
                Close
              </Button>
              {/* <Button variant='ghost'>Secondary Action</Button> */}
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
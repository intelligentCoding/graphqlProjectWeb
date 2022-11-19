import React, { InputHTMLAttributes } from "react";
import NextLink from "next/link";

import { useField } from "formik";
import { FormControl, FormLabel, Input, FormErrorMessage, Textarea, Box, StatGroup, Stat, StatLabel, StatNumber, Link, Heading} from "@chakra-ui/core";
import { PageWrapper } from "./PageWrapper";
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
};

export const Users: React.FC<UserFruitsProps> = ({user}) => {

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
        {/* <Box flex={1}> */}
          {/* {usersData?.user?.id == d.donatorId && (
            <>
              <IconButton
                variantColor="orange"
                icon="edit"
                aria-label="Delete Donation"
                onClick={() => {
                  router.push(`/donations/edit/${d.id}`);
                }}
              />
              <IconButton
                variantColor="red"
                icon="delete"
                aria-label="Delete Donation"
                onClick={async () => {
                  await deleteDonation({
                    id: d.id,
                  });
                  router.push("/");
                }}
              />
            </>
          )} */}
        {/* </Box> */}
      </StatGroup>
    </Box>
  </>
  );
};
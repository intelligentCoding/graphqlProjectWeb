import { NavBar } from "../components/Navbar";
import { useUserQuery, useUsersQuery } from "../generated/graphql";
import NextLink from "next/link";
import {
  Stat,
  StatLabel,
  StatNumber,
  StatGroup,
  Box,
  Spinner,
  Link,
  Heading,
  IconButton,
} from "@chakra-ui/core";
import router from "next/router";
import { Users } from "../components/Users";
const Index = () => {
  const [{ data: usersData, fetching: usersFetching }] = useUsersQuery();
  return (
    <>
      <NavBar />
      {usersData?.users && usersData?.users?.map((u, index) => (
        <Users user={{...u, index: index}}/>
        ))
      }
    </>
  );
};

export default Index;

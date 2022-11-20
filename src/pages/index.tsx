import { NavBar } from "../components/Navbar";
import { useUsersQuery } from "../generated/graphql";
import { Users } from "../components/Users";
const Index = () => {
  const [{ data: usersData, fetching: usersFetching }, executeQuery] = useUsersQuery();
  const onModalClose = () => {
    executeQuery()
  }
  return (
    <>
      <NavBar />
      {usersData?.users && usersData?.users?.map((u, index) => (
        <Users key={u.id} onModalClose={onModalClose} user={{...u, index: index}}/>
        ))
      }
    </>
  );
};

export default Index;

import UserState from "../context/UserState";
import IsLogged from "./IsLogged";

const Home = () => {
  return (
    <UserState>
      <IsLogged />
    </UserState>
  );
};

export default Home;

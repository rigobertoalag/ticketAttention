import UserState from "../context/UserState";
import IsLogged from "./IsLogged";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();

const Home = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <UserState>
        <IsLogged />
      </UserState>
    </QueryClientProvider>
  );
};

export default Home;

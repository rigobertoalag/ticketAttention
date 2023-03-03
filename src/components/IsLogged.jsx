import React, { useContext, useEffect } from "react";
import Chats from "../Chats";
import HomeUserSelection from "./HomeUserSelection";
import UserContext from "../context/UserContext";
import TodayTickets from "./TodayTickets";

const IsLogged = () => {
  const { getUserId, getUserName, user, id, joined } = useContext(UserContext);

  useEffect(() => {
    getUserName();
    getUserId();
  }, []);

  return (
    <div className="container mx-auto h-screen flex justify-center items-center w-full">
      {joined && user ? (
        <div className="flex flex-col h-screen justify-center items-center w-4/5">
          <Chats username={user} userid={id}/>
          <TodayTickets />
        </div>
      ) : (
        <HomeUserSelection />
      )}
    </div>
  );
};

export default IsLogged;

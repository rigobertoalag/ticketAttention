import React, { useContext, useEffect } from "react";
import Chats from "../Chats";
import HomeUserSelection from "./HomeUserSelection";
import UserContext from "../context/UserContext";

const IsLogged = () => {
  const { getUser, user, joined } = useContext(UserContext);

  useEffect(() => {
    getUser();
  }, []);

  const ROOM = "SNHD";
  return (
    <div className="container mx-auto h-screen flex justify-center items-center w-11/12">
      {joined && user ? (
        <Chats username={user} room={ROOM} />
      ) : (
        <HomeUserSelection room={ROOM}/>
      )}
    </div>
  );
};

export default IsLogged;

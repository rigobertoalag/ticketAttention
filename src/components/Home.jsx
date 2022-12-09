import React, { useState } from "react";
import users from "../utils/users";
import socket from '../utils/socket'

import Chats from "../Chats";



const Home = () => {
  const [username, setUsername] = useState("");
  const [joined, setJoined] = useState(false);
  const ROOM = "SNHD";

  const joinRoom = () => {
    if (username !== "" && ROOM !== "") {
      socket.emit("join_room", ROOM);
      setJoined(true);
    }
  };

  return (
    <div className="container mx-auto h-screen flex justify-center items-center w-11/12">
      {joined && username ? (
        <Chats socket={socket} username={username} room={ROOM} />
      ) : (
        <div className="flex flex-col bg-gray-200 w-96 p-6 rounded-lg shadow-md items-center">
          <p className="text-center text-xl font-bold mb-4">
            Selecciona un usuario
          </p>
          <div className="flex flex-col mb-1 w-4/5">
            {users.map((u) => (
              <div
                key={u.id}
                // className="flex flex-row hover:bg-gray-400 p-2 cursor-pointer rounded-md items-center"
                className={`flex flex-row hover:bg-gray-300 p-2 cursor-pointer rounded-md items-center ring-2 ring-gray-300 mx-1 w-full mb-2 ${
                  username === u.name ? "bg-gray-300 ring-2 ring-blue-500" : ""
                }`}
                onClick={() => setUsername(u.name)}
              >
                <div className="bg-blue-700 px-4 py-2 m-2 rounded-full flex justify-center items-center">
                  <p className="text-xl font-bold text-white">{u.username}</p>
                </div>
                <p className="text-lg font-semibold">{u.name}</p>
              </div>
            ))}
          </div>
          <div
            className="py-2 rounded-md mt-4 shadow-lg text-center cursor-pointer font-bold text-white hover:bg-blue-700 bg-blue-800 w-4/5"
            onClick={() => joinRoom()}
          >
            Entrar
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;

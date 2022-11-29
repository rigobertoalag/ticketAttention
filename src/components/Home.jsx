import React, { useState, useEffect } from "react";
import users from "../utils/users";

import io from "socket.io-client";
import Chats from "../Chats";

const socket = io.connect("https://ticketattentionserver-production.up.railway.app/");

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
    <div className="container mx-auto h-screen flex justify-center items-center w-36">
      {joined && username ? (
        <Chats socket={socket} username={username} room={ROOM} />
      ) : (
        <div className="flex flex-col">
          <div className="shadow-lg rounded-md bg-gray-100 border-2 border-gray-200">
            {users.map((u) => (
              <div
                key={u.id}
                // className="flex flex-row hover:bg-gray-400 p-2 cursor-pointer rounded-md items-center"
                className={`flex flex-row hover:bg-gray-400 p-2 cursor-pointer rounded-md items-center ${
                  username === u.name ? "bg-gray-300" : ""
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
            className="py-2 rounded-md mt-4 shadow-lg text-center cursor-pointer font-bold text-white hover:bg-blue-700 bg-blue-800"
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

import React, { useContext, useState } from "react";
import users from "../utils/users";
import UserContext from "../context/UserContext";
import socket from "../utils/socket";

const HomeUserSelection = ({ room }) => {
  const { getUserId, getUserName, getJoined, user } =
    useContext(UserContext);
  const [noUser, setNoUser] = useState(false);

  const joinRoom = () => {
    if (user !== undefined && room !== "") {
      socket.emit("join_room", room);
      getJoined(true);
      setNoUser(false);
    } else {
      setNoUser(true);
    }
  };

  return (
    <div className="flex flex-col bg-gray-200 max-w-md p-6 rounded-lg shadow-md items-center">
      <p className="text-center text-xl font-bold mb-4">
        Selecciona un usuario
      </p>
      <div className="flex flex-col mb-1 w-5/6">
        {users.map((u) => (
          <div
            key={u.id}
            // className="flex flex-row hover:bg-gray-400 p-2 cursor-pointer rounded-md items-center"
            className={`flex flex-row hover:bg-gray-300 p-2 cursor-pointer rounded-md items-center ring-2 ring-gray-300 mx-1 w-full mb-2 ${
              user === u.name ? "bg-gray-300 ring-2 ring-blue-500" : ""
            }`}
            // onClick={() => handleSelectUser(u.name)}
            onClick={() => {
              getUserId(u.id);
              getUserName(u.name);
            }}
          >
            {/* <div className="bg-blue-700 px-4 py-2 m-2 rounded-full flex justify-center items-center">
              <p className="text-lg font-bold text-white">{u.username}</p>
            </div> */}
            <div className="bg-blue-700 h-9 w-9 m-2 rounded-full flex justify-center items-center">
              <p className="text-lg font-bold text-white">{u.username}</p>
            </div>
            <p className="text-md font-semibold">{u.name}</p>
          </div>
        ))}
      </div>
      <div
        className="py-2 rounded-md mt-4 shadow-lg text-center cursor-pointer font-bold text-white hover:bg-blue-700 bg-blue-800 w-4/5"
        onClick={() => joinRoom()}
      >
        Entrar
      </div>
      {noUser ? (
        <div className="py-2 rounded-md mt-4 shadow-lg text-center font-bold text-red-500 ring-2 ring-red-500 w-4/5">
          Selecciona un usuario.
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default HomeUserSelection;

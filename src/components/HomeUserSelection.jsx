import React, { useContext, useState } from "react";
import users from "../utils/users";
import UserContext from "../context/UserContext";
import socket from "../utils/socket";

const HomeUserSelection = ({ room }) => {
  const { getUserId, getUserName, getJoined, user } = useContext(UserContext);
  const [noUser, setNoUser] = useState(false);
  const [showInputPass, setShowInputPass] = useState({
    uid: "",
    uname: "",
  });
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({
    password: "",
  });

  const joinRoom = (user) => {
    if (user !== undefined && room !== "") {
      socket.emit("join_room", room);
      getJoined(true);
      setNoUser(false);
    } else {
      setNoUser(true);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userData = {
      nickname: showInputPass.uname,
      password: password,
    };
    await fetch(
      `https://apex.oracle.com/pls/apex/ticketattention/ticket/user`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      }
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.status === "201") {
          getUserId(showInputPass.uid);
          getUserName(showInputPass.uname);
        } else if (data.status === "401") {
          setErrors({ password: "Contraseña incorrecta" });
        }
      })
      .then(() => joinRoom(showInputPass.uname))
      .catch((error) => console.error(error));
  };

  const InputPassword = () => {
    return (
      <div className="flex flex-col items-center">
        <form onSubmit={handleSubmit} className="flex flex-col items-center">
          <input
            type="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            placeholder="***"
            className="border-2 border-gray-400 rounded-md p-2 w-11/12 focus:outline-none focus:border-sky-600 focus:ring-1 focus:ring-sky-600"
          />
          {errors.password ? (
            <div className="py-2 rounded-md mt-4 shadow-lg text-center text-sm font-bold text-red-500 ring-2 ring-red-500 w-4/5">
              {errors.password}
            </div>
          ) : (
            ""
          )}
          <div
            className="py-2 rounded-md mt-4 shadow-lg text-center cursor-pointer font-bold text-white hover:bg-blue-700 bg-blue-800 w-11/12"
            onClick={handleSubmit}
          >
            Entrar
          </div>
        </form>

        <div
          className="py-2 rounded-md mt-4 shadow-lg text-center cursor-pointer font-bold text-sky-700 hover:bg-white hover:ring-sky-600 ring-2 ring-sky-700 w-9/12"
          onClick={() => {
            setShowInputPass({ uname: "", uid: "" });
            setPassword("");
            setErrors({ password: "" });
          }}
        >
          Regresar
        </div>
      </div>
    );
  };

  return (
    <div className="flex flex-col bg-gray-200 max-w-md p-6 rounded-lg shadow-md items-center">
      <p className="text-center text-xl font-bold mb-4">
        {showInputPass.uid !== "" && showInputPass.uname !== ""
          ? `Ingresa tu contraseña ${showInputPass.uname}`
          : "Selecciona un usuario"}
      </p>
      <div className="flex flex-col mb-1 w-4/5">
        <div>
          {showInputPass.uid !== "" && showInputPass.uname !== "" ? (
            InputPassword()
          ) : (
            <>
              {users.map((u) => (
                <div
                  key={u.id}
                  // className="flex flex-row hover:bg-gray-400 p-2 cursor-pointer rounded-md items-center"
                  className={`flex flex-row hover:bg-gray-300 p-2 cursor-pointer rounded-md items-center ring-2 ring-gray-300 mx-1 w-full mb-2 ${
                    user === u.name ? "bg-gray-300 ring-2 ring-blue-500" : ""
                  }`}
                  onClick={() => {
                    setShowInputPass({ uname: u.name, uid: u.id });
                  }}
                >
                  <div className="bg-blue-700 h-9 w-9 m-2 rounded-full flex justify-center items-center">
                    <p className="text-lg font-bold text-white">{u.username}</p>
                  </div>
                  <p className="text-md font-semibold">{u.name}</p>
                </div>
              ))}
            </>
          )}
        </div>
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

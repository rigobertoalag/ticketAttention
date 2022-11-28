import React, { useContext, useEffect, useState } from "react";
import useTicket from "../hooks/useTicket";
import { Context } from "../utils/Context";

const InProgressTicket = ({ username, socket }) => {
  const [contextTickets, setContextTickets] = useContext(Context);

  const handleRemoveTicket = async (event) => {
    const ticket = event.target.getAttribute("ticket");

    const ticketsFilter = contextTickets.filter((i) => i.message !== ticket);

    console.log("ticketsFilter", ticketsFilter);

    await socket.emit("send_remove_ticket", ticketsFilter);

    setContextTickets(ticketsFilter);
  };

  return (
    <div className="w-11/12 h-4/5 m-2 flex p-0 text-left bg-white shadow-lg ">
      {/* <button onClick={() => setTest()}>test</button> */}
      <div className="flex flex-col w-full">
        {contextTickets.map((ml) => (
          <div
            className={`px-2 ${
              username === ml.author
                ? "divide-y divide-dashed"
                : "animate-pulse bg-green-400"
            }`}
            key={ml.id}
          >
            <div className="-mt-1"></div>
            <div className="mb-3 w-full pt-2">
              <p className={`text-sm text-left text-opacity-50 text-black`}>
                No. ticket:{" "}
              </p>
              <p className={`text-left text-black`}>{ml.message}</p>
              <p className={`text-sm text-left text-opacity-50 text-black`}>
                Atiende:{" "}
              </p>
              <p className={`text-left text-black`}>{ml.author}</p>

              {username === ml.author ? (
                <>
                  <div className="divide-y divide-solid my-2"></div>
                  <div className="w-full flex flex-row">
                    <div
                      ticket={ml.message}
                      onClick={handleRemoveTicket}
                      className="text-sm bg-green-500 p-2 m-1  text-white rounded-md cursor-pointer"
                    >
                      Completar
                    </div>
                    <div className="text-sm bg-orange-500 p-2 m-1 text-white  rounded-md cursor-pointer">
                      Pausar
                    </div>
                  </div>
                </>
              ) : (
                ""
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InProgressTicket;

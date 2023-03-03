import React, { useContext } from "react";
import { Context } from "../utils/Context";

const InProgressTicket = ({ username, socket }) => {
  const [contextTickets, setContextTickets] = useContext(Context);

  const handleRemoveTicket = async (event) => {
    const ticket = event.target.getAttribute("ticket");

    const data = {
      tcktNumber: ticket,
    };

    await fetch(
      "https://apex.oracle.com/pls/apex/ticketattention/ticket/ticket-update/",
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    )
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((error) => console.error(error));

    const message = contextTickets.filter((i) => i.tckt_number !== ticket);

    await socket.emit("message_removed", message);

    setContextTickets(message);
  };

  return (
    <div className="flow-root w-full bg-gray-200">
      <ul className="divide-y divide-gray-400 h-1/2 fixed overflow-y-auto w-4/5">
        {contextTickets.map((ml, i) => (
          <li className="py-2 sm:py-2 bg-gray-200" key={i}>
            <div className="flex items-center space-x-4 mx-4">
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">
                  Ticket:
                </p>
                <p className="text-sm text-gray-500 truncate">{ml.tckt_number}</p>
                <p className="text-sm font-medium text-gray-900 truncate">
                  Atiende:
                </p>
                <p className="text-sm text-gray-500 truncate">{ml.usr_name}</p>
              </div>
              <div className="flex flex-col items-center text-base font-semibold text-gray-900">
                {username === ml.usr_nickname ? (
                  <div
                    className="text-sm p-2 m-1  text-sky-700 ring-2 ring-sky-700 hover:bg-sky-700 hover:text-white hover:ring-0 rounded-md cursor-pointer shadow-md"
                    ticket={ml.tckt_number}
                    onClick={handleRemoveTicket}
                  >
                    Completar
                  </div>
                ) : (
                  <div className="flex flex-row items-center">
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-green-600 mr-1">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75"></span>
                    </span>
                    <p className="text-green-600">En proceso</p>
                  </div>
                )}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default InProgressTicket;

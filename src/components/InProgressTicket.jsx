import React, { useContext } from "react";
import { Context } from "../utils/Context";

const InProgressTicket = ({ username, socket }) => {
  const [contextTickets, setContextTickets] = useContext(Context);

  const handleRemoveTicket = async (event) => {
    const ticket = event.target.getAttribute("ticket");

    const ticketsFilter = contextTickets.filter((i) => i.message !== ticket);

    await socket.emit("send_remove_ticket", ticketsFilter);

    setContextTickets(ticketsFilter);
  };

  return (
    <div className="flow-root w-full">
      <ul className="divide-y divide-gray-400">
        {contextTickets.map((ml) => (
          <li className="py-4 sm:py-4" key={ml.id}>
            <div className="flex items-center space-x-4 mx-4">
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">
                  Ticket:
                </p>
                <p className="text-sm text-gray-500 truncate">{ml.message}</p>
                <p className="text-sm font-medium text-gray-900 truncate">
                  Atiende:
                </p>
                <p className="text-sm text-gray-500 truncate">{ml.author}</p>
              </div>
              <div className="flex flex-col items-center text-base font-semibold text-gray-900">
                {/* <p className="text-sm text-gray-500 truncate mb-1">
                    Transcurrido: 1:00
                  </p> */}
                {username === ml.author ? (
                  <div
                    className="text-sm p-2 m-1  text-sky-700 ring-2 ring-sky-700 hover:bg-sky-700 hover:text-white hover:ring-0 rounded-md cursor-pointer shadow-md"
                    ticket={ml.message}
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

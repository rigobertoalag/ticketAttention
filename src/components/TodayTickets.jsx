import React from "react";
import { useQuery } from "react-query";
import GetLapsedTime from "../utils/GetLapsedTime";

const TodayTickets = () => {
  const { isLoading, error, data } = useQuery("tickets", () =>
    fetch(
      "https://apex.oracle.com/pls/apex/ticketattention/ticket/tickets-current-date"
    ).then((res) => res.json())
  );

  if (isLoading) return <div>Cargando...</div>;

  if (error) return <div>Error al cargar los datos: {error.message}</div>;

  return (
    <div className="bottom-0 fixed overflow-y-auto h-1/5 w-full bg-white shadow-lg">
      <p className="ml-4 text-slate-700">Tickets atendidos del día</p>
      <div className="w-full px-4">
        {!data.items[0] ? (
          <div>
            <p className="text-slate-900 text-center mt-8">
              No se han atendido tickets
            </p>
          </div>
        ) : (
          data.items.map((t, i) => (
            <div
              key={i}
              className="bg-gray-200 p-2 my-2 rounded-md shadow-md w-full"
            >
              <div className="flex flex-grow w-full justify-between">
                <div className="mr-2">
                  <p className="text-sky-700">{t.ticketnumber}</p>
                  <p className="text-xs text-slate-500">Atendió: {t.user}</p>
                </div>
                <div className="text-center">
                  <p className="text-xs text-slate-500">Atendido en:</p>
                  {GetLapsedTime(t.ticketstart, t.ticketend)}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default TodayTickets;

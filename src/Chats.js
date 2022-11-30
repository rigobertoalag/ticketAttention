import React, { useEffect, useRef, useState } from 'react'

import InProgressTicket from './components/InProgressTicket'

import { Context } from './utils/Context';

const Chats = ({ socket, username, room }) => {

    const [currentTicket, setCurrentTicket] = useState("")
    const [contextTickets, setContextTickets] = useState([]);

    //use to prevent the double useefect call
    const shouldLog = useRef(true)
    //

    const sendMessage = async () => {
        if (currentTicket !== "") {
            const ticketData = {
                id: contextTickets.length + 1,
                room: room,
                author: username,
                message: currentTicket,
                time: new Date(Date.now()).getHours() + ":" + new Date(Date.now()).getMinutes()
            }

            await socket.emit("send_message", ticketData)

            setContextTickets((list) => [...list, ticketData])
            setCurrentTicket("")
        }
    }

    useEffect(() => {
        if (shouldLog.current) {

            //use to prevent the double useefect call
            shouldLog.current = false
            //

            socket.on("receive_message", (data) => {
                setContextTickets((list) => [...list, data])
            })
        }

        socket.on("recive_remove_ticket", (data) => {
            setContextTickets(data)
        })
    }, [socket])

    return (
        <Context.Provider value={[contextTickets, setContextTickets]}>
            <div className="container mx-auto h-full flex justify-center w-full">
                <div className='flex flex-col items-center w-full'>
                    <div>
                        <p className='text-base font-semibold text-center'>Atencion de tickets</p>
                    </div>
                    <div className='my-4 bg-gray-200 rounded-md w-10/12 flex flex-col justify-center items-center shadow-lg'>
                        <p className='text-base font-semibold py-4 text-center'>Ingresa el No. de ticket</p>
                        <input
                            type="text"
                            value={currentTicket}
                            placeholder='RITM...'
                            onChange={(e) => { setCurrentTicket(e.target.value) }}
                            onKeyDown={(e) => { e.key === "Enter" && sendMessage() }}
                            className="border-2 border-gray-400 rounded-md p-2 w-11/12 focus:outline-none focus:border-sky-600 focus:ring-1 focus:ring-sky-600"
                        />

                        <div
                            className={`p-2 m-4 rounded-md shadow-lg text-center font-bold w-11/12 ${currentTicket ? "cursor-pointer text-white hover:bg-sky-700 bg-sky-500" : "cursor-not-allowed bg-sky-400 text-sky-700 text-opacity-40"}`}
                            onClick={sendMessage}
                        >
                            Atender
                        </div>

                        <InProgressTicket username={username} socket={socket} />

                    </div>

                    {/* HISTORICO DE TICKETS ATENDIDOS */}
                    {/* <div className='divide-y divide-solid'>
                        <p className='text-black text-sm text-center text-opacity-50'>Tickets atendidos</p>
                        <div>
                            {contextTickets.map((ml, i) => (
                                <p className='text-black text-sm text-left text-opacity-50' key={i}>{ml.message}</p>
                            ))}
                        </div>
                    </div> */}
                </div>
            </div>
        </Context.Provider>
    )
}

export default Chats
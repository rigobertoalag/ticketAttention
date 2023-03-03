import React, { useEffect, useRef, useState } from 'react'

import InProgressTicket from './components/InProgressTicket'

import { Context } from './utils/Context';

import socket from './utils/socket'
import { useQuery } from 'react-query';

const Chats = ({ username, userid }) => {

    const [currentTicket, setCurrentTicket] = useState("")
    const [contextTickets, setContextTickets] = useState([]);
    const [errors, setErrors] = useState("")

    const inputRef = useRef(null);

    const sendMessage = (e) => {
        e.preventDefault()

        if (currentTicket !== "") {
            const ticketData = {
                tnumber: currentTicket,
                tuserid: userid,
                author: username,
            }

            fetch(
                `https://apex.oracle.com/pls/apex/ticketattention/ticket/ticket-create`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(ticketData)
                }
            )
                .then((response) => response.json())
                .then((data) => {
                    const responseStatus = parseInt(data.status);

                    if (responseStatus === 201) {
                        const newTicketData = {
                            tckt_number: currentTicket,
                            usr_name: username,
                            usr_nickname: username
                        }

                        socket.emit("message", newTicketData)

                        setContextTickets([newTicketData, ...contextTickets])
                        setCurrentTicket("")
                        setErrors('')
                    } else if (responseStatus === 401) {
                        setErrors('El ticket ya existe')
                    }
                })
                .catch((error) => console.error(error));
        } else {
            return setErrors('Ingresa un ticket')
        }
    }

    useEffect(() => {
        inputRef.current.focus();

        const receiveMessage = message => {
            setContextTickets([message.body, ...contextTickets])
        }

        const receiveDeletedMessages = message => {
            setContextTickets(message)
        }

        socket.on('message', receiveMessage)
        socket.on('message_removed', receiveDeletedMessages)

        return () => {
            socket.off('message', receiveMessage)
        }
    }, [contextTickets])

    useEffect(() => {
        fetch(`https://apex.oracle.com/pls/apex/ticketattention/ticket/has-tickets`)
            .then(response => response.json())
            .then(data => setContextTickets(data.items));
    }, [])

    return (
        <Context.Provider value={[contextTickets, setContextTickets]}>
            <div className="container mx-auto h-full flex justify-center max-w-md">
                <div className='flex flex-col items-center w-full'>
                    <div className='mt-6'>
                        <p className='text-base font-semibold text-center'>Atencion de tickets</p>
                    </div>
                    <div className='my-4 bg-gray-200 rounded-md w-full flex flex-col justify-center items-center shadow-lg'>
                        <form onSubmit={sendMessage} className='flex flex-col w-full justify-center items-center'>
                            <p className='text-base font-semibold py-4 text-center'>Ingresa el No. de ticket</p>
                            <input
                                type="text"
                                value={currentTicket}
                                placeholder='RITM...'
                                onChange={(e) => { setCurrentTicket(e.target.value) }}
                                ref={inputRef}
                                className="border-2 border-gray-400 rounded-md p-2 w-11/12 focus:outline-none focus:border-sky-600 focus:ring-1 focus:ring-sky-600"
                            />

                            {errors ? <p className='py-2 text-center font-bold text-red-500'>{errors}</p> : null}

                            <div
                                className={`p-2 m-4 rounded-md shadow-lg text-center font-bold w-11/12 ${currentTicket ? "cursor-pointer text-white hover:bg-sky-700 bg-sky-500" : "cursor-not-allowed bg-sky-400 text-sky-700 text-opacity-40"}`}
                                onClick={sendMessage}
                            >
                                Atender
                            </div>

                        </form>

                        <InProgressTicket username={username} socket={socket} />

                    </div>
                </div>
            </div>
        </Context.Provider>
    )
}

export default Chats
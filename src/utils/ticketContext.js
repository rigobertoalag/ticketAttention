import { createContext } from "react";

const ticketContext = createContext({
    id: null,
    room: null,
    author: null,
    message: null,
    time: null
});

export default ticketContext;
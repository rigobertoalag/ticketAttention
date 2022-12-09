import io from "socket.io-client";

const socket = io.connect(
  "https://ticketattentionserver-production.up.railway.app/"
); //PRODUCTION
// const socket = io.connect("http://localhost:3001");  //DEV

export default socket
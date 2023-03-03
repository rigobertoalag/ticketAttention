import React, { useState } from 'react'
import io from 'socket.io-client'
import Chats from './Chats'

// const socket = io.connect('http://localhost:3001')
const socket = io.connect('https://ticket-attention.vercel.app')

function App() {

  const [username, setUsername] = useState("")
  const [room, setRoom] = useState("")

  const joinRoom = () => {
    if (username !== "" && room !== "") {
      socket.emit("join_room", room)
    }
  }

  return (
    <div>
      <h3>Join a Chat</h3>

      <input type="text" placeholder="Name..." onChange={(e) => { setUsername(e.target.value) }} />
      <input type="text" placeholder="Room ID..." onChange={(e) => { setRoom(e.target.value) }} />

      <button onClick={joinRoom}>Join</button>

      <Chats socket={socket} username={username} room={room} />
    </div>
  );
}

export default App;

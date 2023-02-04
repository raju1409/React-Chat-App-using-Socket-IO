import './App.css';
import io from "socket.io-client";
import {useState} from "react";
import Chat from './Chat';


const socket = io.connect("http://localhost:3001");

function App() {

  const [username , setUsername] = useState("")
  const [room, setRoom ] = useState("")
  const [showChat, setShowChat] = useState(false)

  const joinRoom = () => {
    if (username !== "" && room !== ""){
      // console.log("user Disconnected", socket.id)
      socket.emit("join_room", room)
      setShowChat(true)
    }
  }

  return (
    <div className="App">
      {!showChat ? (
      <div className='joinChatContainer'>
        <h3>Join Chat</h3>
        <input type="text" onChange={e => setUsername(e.target.value)} placeholder="John..." />
        <input type="text" onChange={e => setRoom(e.target.value)} placeholder="room..." />
        <button onClick={joinRoom}>Join In A Room</button>
      </div>
      )
      : (

      <Chat socket={socket} username={username} room={room} />
      )}

    </div>
  );
}

export default App;

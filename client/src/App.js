import "./App.css";
import io from "socket.io-client";
import { useState } from "react";
import Chat from "./Chat";

const socket = io.connect("http://localhost:3001");

function App() {
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");
  const [showChat, setShowChat] = useState(false);

  const joinRoom = () => {
    if (username !== "" && room !== "") {
      socket.emit("join_room", room);
      setShowChat(true);
    }
  };

  return (
    <div className="w-screen h-screen bg-white text-black grid place-items-center">
      {!showChat ? (
        <div className="joinChatContainer flex flex-col text-center">
          <h3 className=" text-4xl mb-4">Join A Chat</h3>
          <input
            className="w-56 h-10 m-2 border-2 rounded-xl p-1 text-base"
            type="text"
            placeholder="John..."
            onChange={(event) => {
              setUsername(event.target.value);
            }}
          />
          <input
            className="w-56 h-10 m-2 border-2 rounded-xl p-1 text-base"
            type="text"
            placeholder="Room ID..."
            onChange={(event) => {
              setRoom(event.target.value);
            }}
          />
          <button
            className=" w-56 h-12 m-2  border-none rounded-lg p-1 text-base bg-blue-500 hover:bg-blue-400 text-white cursor-pointer "
            onClick={joinRoom}
          >
            Join A Room
          </button>
        </div>
      ) : (
        <Chat socket={socket} username={username} room={room} />
      )}
    </div>
  );
}

export default App;

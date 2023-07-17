import React, { useEffect, useState } from "react";
import ScrollToBottom from "react-scroll-to-bottom";

function Chat({ socket, username, room }) {
  const [currentMessage, setCurrentMessage] = useState("");
  const [messageList, setMessageList] = useState([]);

  const sendMessage = async () => {
    if (currentMessage !== "") {
      const messageData = {
        room: room,
        author: username,
        message: currentMessage,
        time:
          new Date(Date.now()).getHours() +
          ":" +
          new Date(Date.now()).getMinutes(),
      };

      await socket.emit("send_message", messageData);
      setMessageList((list) => [...list, messageData]);
      setCurrentMessage("");
    }
  };

  useEffect(() => {
    socket.on("receive_message", (data) => {
      setMessageList((list) => [...list, data]);
    });
  }, [socket]);

  return (
    <div className="chat-window w-1/2 h-1/2">
      <div className=" h-11 rounded-md bg-green-300 reletive cursor-pointer">
        <p className="m-0 block p-1 text-white font-semibold text-center leading-10">
          Live Chat
        </p>
      </div>
      <div className="chat-body border-2 bg-white rounded-md relative">
        <ScrollToBottom className="message-container">
          {messageList.map((messageContent) => {
            return (
              <div
                className="message h-auto p-3 flex"
                id={username === messageContent.author ? "you" : "other"}
              >
                <div>
                  <div className="message-content ">
                    <p>{messageContent.message}</p>
                  </div>
                  <div className="message-meta">
                    <p id="time">{messageContent.time}</p>
                    <p id="author">{messageContent.author}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </ScrollToBottom>
      </div>
      <div className="chat-footer">
        <input
          type="text"
          value={currentMessage}
          placeholder="Your Message ......."
          onChange={(event) => {
            setCurrentMessage(event.target.value);
          }}
          onKeyPress={(event) => {
            event.key === "Enter" && sendMessage();
          }}
        />

        <button
          className="border-0 grid flex-1 place-items-center cursor-pointer  h-full bg-transparent outline-none text-2xl text-green-500 hover:text-color:400"
          onClick={sendMessage}
        >
          &#9658;
        </button>
      </div>
    </div>
  );
}

export default Chat;

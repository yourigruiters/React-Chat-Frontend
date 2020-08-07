import * as React from "react";
import * as io from "socket.io-client";

import ChatFooter from "./components/chat-footer/chat-footer";
import ChatMain from "./components/chat-main/chat-main";

import "./chatpage.view.scss";

interface chatpageProps {
  username: string;
  history: any;
}

type messageType = {
  username: string;
  color: string;
  type: number;
  message: string;
  timestamp: string;
};

type userType = {
  username: string;
  color: string;
};

const ChatpageView: React.FC<chatpageProps> = ({
  username,
  history
}: chatpageProps) => {
  const [socket, setSocket] = React.useState<any>({});
  const [messages, setMessages] = React.useState<messageType[]>([]);
  const [onlineUsers, setOnlineUsers] = React.useState<userType[]>([]);
  const [typingUsers, setTypingUsers] = React.useState([]);
  const [messageInput, setMessageInput] = React.useState("");
  const [messageWarning, setMessageWarning] = React.useState(false);
  const [isTyping, setIsTyping] = React.useState(false);

  React.useEffect(() => {
    // Send user to homepage if no username is present
    if (!username) {
      history.push("/?warning=no-user");
      return;
    }

    // Create socket for socket.io connection
    // const socket = io("http://localhost:5000");
    const socket = io("https://ubiquiti-server.herokuapp.com/");
    setSocket(socket);

    // Join chatroom to fetch roomData
    socket.emit("join_chatroom", username);

    socket.on(
      "new_roomdata",
      (roomData: { onlineUsers: userType[]; typingUsers: string[] }) => {
        setOnlineUsers(() => {
          return roomData.onlineUsers;
        });
        setTypingUsers(() => {
          return roomData.typingUsers;
        });
      }
    );

    socket.on(
      "new_message",
      (newMessage: {
        username: string;
        color: string;
        type: number;
        message: string;
        timestamp: string;
      }) => {
        // Create correct timestamp for messages
        const today = new Date();
        const hours =
          today.getHours().toString().length === 1
            ? "0" + today.getHours()
            : today.getHours();
        const minutes =
          today.getMinutes().toString().length === 1
            ? "0" + today.getMinutes()
            : today.getMinutes();
        const time = `${hours}:${minutes}`;

        newMessage.timestamp = time;

        setMessages((prevState: messageType[]) => {
          return [...prevState, newMessage];
        });
      }
    );

    socket.on("changed_typing", (isTypingUsers: string[]) => {
      setTypingUsers(isTypingUsers);
    });

    socket.on("leave_inactivity", () => {
      socket.disconnect();
      history.push("/?warning=no-activity");
    });

    socket.on("disconnect", () => {
      socket.disconnect();
      history.push("/?warning=no-activity");
    });
  }, []);

  React.useEffect(() => {
    const enterListener = (event: any) => {
      if (event.code === "Enter" || event.code === "NumpadEnter") {
        if (event.shiftKey) {
          return;
        }

        handleSubmit(event);
      }
    };

    document.addEventListener("keydown", enterListener);

    return () => {
      document.removeEventListener("keydown", enterListener);
    };
  }, [messageInput]);

  // Send user typing information to server - Ensuring activityChecker in server
  const handleChange = (event: any) => {
    setMessageInput(event.target.value);

    if (event.target.value.length === 1 && !isTyping) {
      setIsTyping(true);
      socket.emit("changed_typing", true);
    } else if (event.target.value.length === 0 && isTyping) {
      setIsTyping(false);
      socket.emit("changed_typing", false);
    }

    if (
      messageWarning &&
      event.target.value &&
      event.target.value.replace(/\s/g, "").length >= 1
    ) {
      setMessageWarning(false);
    }
  };

  const handleSubmit = (event: any) => {
    event.preventDefault();

    if (!messageInput || !messageInput.replace(/\s/g, "").length) {
      setMessageWarning(true);
      return;
    }

    socket.emit("send_message", messageInput);
    setIsTyping(false);
    setMessageInput("");
  };

  // Disconnect button
  const handleDisconnect = () => {
    socket.emit("leave_chatroom");
    socket.disconnect();
    history.push("/");
  };

  return (
    <section className="chatpage">
      <section className="chatpage__main">
        <ChatMain
          messages={messages}
          onlineUsers={onlineUsers}
          handleDisconnect={handleDisconnect}
          username={username}
        />
      </section>
      <section className="chatpage__footer">
        <ChatFooter
          messageInput={messageInput}
          messageWarning={messageWarning}
          typingUsers={typingUsers}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
        />
      </section>
    </section>
  );
};

export default ChatpageView;

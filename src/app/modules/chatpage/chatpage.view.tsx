import * as React from "react";
import * as io from "socket.io-client";

import ChatFooter from "./components/chat-footer/chat-footer";
import ChatMain from "./components/chat-main/chat-main";

import "./chatpage.view.scss";

interface chatpageProps {
  username: string;
  history: any;
}

const socket = io("http://localhost:5000");

const ChatpageView = ({ username, history }: chatpageProps) => {
  // Fix: clear default messages - isTyping and all.
  const [messages, setMessages] = React.useState<object[]>([
    {
      username: "iSnaek",
      color: "#128417",
      type: 0,
      message: "",
      timestamp: "12:43"
    },
    {
      username: "UsedToLoveYa",
      color: "#814892",
      type: 0,
      message: "",
      timestamp: "12:43"
    },
    {
      username: "iSnaek",
      color: "#128417",
      type: 4,
      message: "What about sending me a long message?",
      timestamp: "12:43"
    },
    {
      username: "UsedToLoveYa",
      color: "#814892",
      type: 4,
      message:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos iusto cum quis ex odio commodi, accusantium voluptates perferendis voluptate sapiente doloribus sed mollitia exercitationem totam molestiae quidem quibusdam odit quod ipsa ad aliquid adipisci? Dignissimos modi tempora laborum, sapiente magnam aliquid quisquam quod adipisci voluptatem distinctio esse quae minus ipsum numquam natus aperiam iure error!",
      timestamp: "12:43"
    },
    {
      username: "iSnaek",
      color: "#128417",
      type: 2,
      message: "",
      timestamp: "12:43"
    },
    {
      username: "iSnaek",
      color: "#128417",
      type: 3,
      message: "",
      timestamp: "12:43"
    },
    {
      username: "UsedToLoveYa",
      color: "#814892",
      type: 1,
      message: "",
      timestamp: "12:43"
    }
  ]);
  const [onlinePeople, setOnlinePeople] = React.useState<object[]>([
    {
      username: "iSnaek",
      color: "#128417"
    },
    {
      username: "UsedToLoveYa",
      color: "#814892"
    }
  ]);
  const [typingPeople, setTypingPeople] = React.useState([
    "iSnaek",
    "UsedToLoveYa"
  ]);
  const [messageInput, setMessageInput] = React.useState("");
  const [messageWarning, setMessageWarning] = React.useState(false);

  // Fix: Reactivate this when done implementing page
  React.useEffect(() => {
    if (!username) {
      history.push("/?warning=no-user");
      return;
    }

    socket.emit("join_chatroom", username);

    socket.on("join_chatroom", (roomData: {}) => {
      console.log("hihihihi");
    });
  }, []);

  // FIX: improve enter handling
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

  const handleChange = (event: any) => {
    setMessageInput(event.target.value);

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

    // Fix: send messsages
    // const newMessage = {
    //   username,
    //   message: messageInput
    // };

    // SOCKET.IO call with newMessage;
    setMessageInput("");
  };

  const handleDisconnect = () => {
    console.log("handleDisconnect");
    // Fix: CLOSE CONNECTION AND SEND USER TO HOMEPAGE

    history.push("/");
  };

  return (
    <section className="chatpage">
      <section className="chatpage__main">
        <ChatMain
          messages={messages}
          onlinePeople={onlinePeople}
          handleDisconnect={handleDisconnect}
          username={username}
        />
      </section>
      <section className="chatpage__footer">
        <ChatFooter
          messageInput={messageInput}
          messageWarning={messageWarning}
          typingPeople={typingPeople}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
        />
      </section>
    </section>
  );
};

export default ChatpageView;

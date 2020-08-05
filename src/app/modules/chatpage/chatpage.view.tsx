import * as React from "react";

import ChatFooter from "./components/chat-footer/chat-footer";
import ChatMain from "./components/chat-main/chat-main";

import "./chatpage.view.scss";

interface chatpageProps {
  username: string;
  history: any;
}

const ChatpageView = ({ username, history }: chatpageProps) => {
  const [messages, setMessages] = React.useState([]);
  const [onlinePeople, setOnlinePeople] = React.useState<object[]>([
    {
      username: "iSnaek",
      color: "#128417"
    },
    {
      username: "UsedToLoveYa",
      color: "#128417"
    }
  ]);
  const [typingPeople, setTypingPeople] = React.useState([
    "iSnaek",
    "UsedToLoveYa"
  ]);
  const [messageInput, setMessageInput] = React.useState("");
  const [messageWarning, setMessageWarning] = React.useState(false);

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

    // const newMessage = {
    //   username,
    //   message: messageInput
    // };

    // SOCKET.IO call with newMessage;
    setMessageInput("");
  };

  const handleLogout = () => {
    console.log("LOGOUT");
    // CLOSE CONNECTION AND SEND USER TO HOMEPAGE
  };

  // React.useEffect(() => {
  //   if (!username) {
  //     history.push("/?warning=no-user");
  //   }
  // }, []);

  console.log(username, history);

  return (
    <section className="chatpage">
      <section className="chatpage__main">
        <ChatMain
          messages={messages}
          onlinePeople={onlinePeople}
          handleLogout={handleLogout}
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

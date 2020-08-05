import * as React from "react";
import cn from "classnames";

import "./chat-main.scss";
import { ToggleSidebar, OnlineUsers } from "../../../../../assets/icons/icons";
import Chat from "../chat/chat";

interface chatFooterProps {
  messages: object[];
  onlinePeople: object[];
  handleDisconnect: () => void;
  username: string;
}

const ChatMain = ({
  messages,
  onlinePeople,
  handleDisconnect,
  username
}: chatFooterProps) => {
  const [openSidebar, setOpenSidebar] = React.useState(true);

  return (
    <section className="chat-main">
      <section
        className={cn("chat-main__messages", {
          "chat-main__messages--smaller": openSidebar
        })}
      >
        <Chat messages={messages} username={username} />
      </section>
      <section
        className={cn("chat-main__people", {
          "chat-main__people--open": openSidebar
        })}
      >
        <section className="chat-main__people__header">
          <article
            className="chat-main__people__header__button"
            onClick={() => setOpenSidebar(!openSidebar)}
          >
            <button>
              <ToggleSidebar />
            </button>
          </article>
          <article className="chat-main__people__header__title">
            <p>
              Online users - <span>{onlinePeople.length}</span>
            </p>
            <OnlineUsers />
          </article>
        </section>
        <section className="chat-main__people__main">
          {onlinePeople.map(
            (
              onlinePerson: { username: string; color: string },
              index: number
            ) => (
              <article key={index} className="chat-main__people__main__person">
                <p style={{ color: onlinePerson.color }}>
                  {onlinePerson.username}
                </p>
              </article>
            )
          )}
        </section>
        <section className="chat-main__people__footer">
          <button onClick={handleDisconnect}>Disconnect</button>
        </section>
      </section>
    </section>
  );
};

export default ChatMain;

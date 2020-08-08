import * as React from "react";
import cn from "classnames";

import "./chat-main.scss";
import { ToggleSidebar, OnlineUsers } from "../../../../../assets/icons/icons";
import Chat from "../chat/chat";

interface chatMainProps {
  messages: messageType[];
  onlineUsers: userType[];
  handleDisconnect: () => void;
  username: string;
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

const ChatMain: React.FC<chatMainProps> = ({
  messages,
  onlineUsers,
  handleDisconnect,
  username
}: chatMainProps) => {
  const [openSidebar, setOpenSidebar] = React.useState(true);

  // Set to false if small device
  React.useEffect(() => {
    if (window.innerWidth <= 768) {
      setOpenSidebar(false);
    }
  }, []);

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
            <p data-cyid="chatpage-online">
              Online users - <span>{onlineUsers.length}</span>
            </p>
            <OnlineUsers />
          </article>
        </section>
        <section className="chat-main__people__main">
          {onlineUsers.map(
            (
              onlineUser: { username: string; color: string },
              index: number
            ) => (
              <article key={index} className="chat-main__people__main__person">
                <p style={{ color: onlineUser.color }}>{onlineUser.username}</p>
              </article>
            )
          )}
        </section>
        <section className="chat-main__people__footer">
          <button onClick={handleDisconnect} data-cyid="chatpage-disconnect">
            Disconnect
          </button>
        </section>
      </section>
    </section>
  );
};

export default ChatMain;

import * as React from "react";
import cn from "classnames";

import "./chat.scss";

interface chatProps {
  messages: messageType[];
  username: string;
}

type messageType = {
  username: string;
  color: string;
  type: number;
  message: string;
  timestamp: string;
};

const Chat: React.FC<chatProps> = ({ messages, username }: chatProps) => {
  const messagesEndRef = React.useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current.scrollIntoView();
  };

  React.useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <section className="chat">
      <section className="chat__messages" data-cyid="chatpage-messages">
        {messages.map(
          (
            message: {
              username: string;
              color: string;
              type: number;
              message: string;
              timestamp: string;
            },
            index: number
          ) => {
            return (
              <section
                key={index}
                className={cn("chat__block", {
                  "chat__block--owner":
                    message.username.toLowerCase() === username.toLowerCase() &&
                    message.type === 4
                })}
              >
                <article className="chat__block__timestamp">
                  {message.timestamp}
                </article>
                <article className="chat__block__message">
                  {message.type !== 4 ? (
                    <p className="chat__block__message--default">
                      <span
                        style={{ color: message.color }}
                        className={cn({
                          "chat__block__message--owner": message.type === 2
                        })}
                      >
                        {message.username}{" "}
                      </span>
                      {message.type === 0
                        ? "has joined the chatroom."
                        : message.type === 1
                        ? "has left the chatroom."
                        : message.type === 2
                        ? "has been disconnected due to inactivity."
                        : "has left the chatroom, connection lost."}
                    </p>
                  ) : (
                    <article className="chat__block__message--bubble">
                      <p className="chat__block__message--owner">
                        <span style={{ color: message.color }}>
                          {message.username}
                        </span>
                      </p>
                      <p className="">{message.message}</p>
                    </article>
                  )}
                </article>
              </section>
            );
          }
        )}
        <article ref={messagesEndRef} />
      </section>
    </section>
  );
};

export default Chat;

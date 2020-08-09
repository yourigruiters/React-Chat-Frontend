import * as React from "react";
import cn from "classnames";

import { SendMessage } from "../../../../../assets/icons/icons";

import "./chat-footer.scss";

interface chatFooterProps {
  messageInput: string;
  messageWarning: boolean;
  typingUsers: string[];
  handleChange: (e: any) => void;
  handleSubmit: (e: any) => void;
}

const ChatFooter: React.FC<chatFooterProps> = ({
  messageInput,
  messageWarning,
  typingUsers,
  handleChange,
  handleSubmit
}: chatFooterProps) => {
  return (
    <section className="chat-footer">
      <section className="chat-footer__form">
        <form
          className="chat-footer__form__form"
          onSubmit={(e: any) => handleSubmit(e)}
        >
          <article
            className={cn("chat-footer__form__form__block", {
              "chat-footer__form__form__block--warning": messageWarning
            })}
          >
            <textarea
              placeholder="Write a message.."
              onChange={(e: any) => handleChange(e)}
              value={messageInput}
              data-cyid="chatpage-input"
            ></textarea>
            <button type="submit" data-cyid="chatpage-button">
              <SendMessage />
              <span>Send</span>
            </button>
          </article>
        </form>
      </section>
      <section className="chat-footer__details">
        <p>
          {typingUsers && typingUsers.length > 2
            ? "Several people are typing..."
            : typingUsers.map((typingUser: string, index: number) => {
                let string = "";
                string += typingUser;
                if (index === 0 && typingUsers.length === 1) {
                  string += " is typing...";
                } else if (index === 0) {
                  string += " and ";
                }
                if (index === 1) {
                  string += " are typing...";
                }
                return string;
              })}
        </p>
      </section>
    </section>
  );
};

export default ChatFooter;

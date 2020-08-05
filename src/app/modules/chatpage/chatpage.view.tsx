import * as React from "react";

import "./chatpage.view.scss";

interface chatpageProps {
  username: string;
}

const ChatpageView = ({ username }: chatpageProps) => {
  console.log("UPON ENTERING USERNAME IS", username);
  return <section className="chatpage">{username}</section>;
};

export default ChatpageView;

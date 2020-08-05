import * as React from "react";

import Form from "./components/form/form";

import Logo from "../../../assets/images/ubiquiti-logo-white.png";

import "./homepage.view.scss";

interface homepageProps {
  setUsername: (newUsername: { username: string }) => void;
  history: any;
  location: any;
}

const HomepageView = ({ setUsername, history, location }: homepageProps) => {
  const [userInput, setUserInput] = React.useState("Visitor");
  const [warning, setWarning] = React.useState("");

  React.useEffect(() => {
    const search = new URLSearchParams(location.search);
    const searchWarning = search.get("warning");

    if (searchWarning) {
      switch (searchWarning) {
        case "no-user":
          setWarning(
            "Please provide a username before accessing the chatroom."
          );
          break;
        default:
          setWarning("");
          break;
      }
    }
  }, []);

  const handleChange = (event: any) => {
    setUserInput(event.target.value);

    if (
      warning &&
      event.target.value &&
      event.target.value.replace(/\s/g, "").length >= 1
    ) {
      setWarning("");
    }
  };

  const handleSubmit = (event: any) => {
    event.preventDefault();

    if (!userInput || !userInput.replace(/\s/g, "").length) {
      setWarning("Please enter a valid username.");
      return;
    }

    const newUsername = {
      username: userInput
    };

    setUsername(newUsername);

    history.push("/chatroom");
  };

  return (
    <section className="homepage">
      <section className="homepage__login">
        <section className="homepage__login__form">
          <Form
            userInput={userInput}
            warning={warning}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
          />
        </section>
      </section>
      <section className="homepage__banner">
        <article className="homepage__banner__logo">
          <img src={Logo} alt="logo" />
        </article>
      </section>
    </section>
  );
};

export default HomepageView;

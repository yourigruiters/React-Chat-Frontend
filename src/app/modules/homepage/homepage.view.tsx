import * as React from "react";
import axios from "axios";

import Form from "./components/form/form";

import Logo from "../../../assets/images/logo-white.png";

import "./homepage.view.scss";

interface homepageProps {
  username: string;
  setUsername: (newUsername: { username: string }) => void;
  history: any;
  location: any;
}

const HomepageView: React.FC<homepageProps> = ({
  username,
  setUsername,
  history,
  location,
}: homepageProps) => {
  const [userInput, setUserInput] = React.useState("Visitor");
  const [warning, setWarning] = React.useState("");

  React.useEffect(() => {
    // Set correct starting username
    if (username) {
      setUserInput(username);
    } else {
      const random = Math.floor(1000 + Math.random() * 9000);
      setUserInput(`Visitor${random}`);
    }

    // Check for warning and display if found
    const search = new URLSearchParams(location.search);
    const searchWarning = search.get("warning");

    if (searchWarning) {
      switch (searchWarning) {
        case "no-user":
          setWarning(
            "Please provide a username before accessing the chatroom."
          );
          break;
        case "no-activity":
          setWarning(
            "Disconnected by the server due to inactivity or unwanted behaviour."
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

  const handleSubmit = async (event: any) => {
    event.preventDefault();

    if (!userInput || !userInput.replace(/\s/g, "").length) {
      setWarning("Please enter a valid username.");
      return;
    }

    // Check if username is available - Provide warning if not
    await axios
      // .get(`http://localhost:5000/api/user/${userInput}`)
      .get(`https://ubiquiti-server.herokuapp.com/api/user/${userInput}`)
      .then((res) => {
        if (res.status === 200) {
          const newUsername = {
            username: userInput,
          };

          setUsername(newUsername);

          history.push("/chatroom");
        } else if (res.status === 202) {
          setWarning(
            "This username is already taken, please change and try again."
          );
        } else {
          setWarning(
            "The server has experienced an unexpected event, please try again."
          );
        }
      })
      .catch(() => {
        setWarning("The server is unavailable.");
      });
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

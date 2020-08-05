import * as React from "react";

import Form from "../../components/form/form";

import Logo from "../../../assets/images/ubiquiti-logo-white.png";

import "./homepage.view.scss";

const HomepageView = () => {
  const [username, setUsername] = React.useState("Stranger");
  const [warning, setWarning] = React.useState("");

  const handleChange = (event: any) => {
    setUsername(event.target.value);

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

    if (!username || !username.replace(/\s/g, "").length) {
      setWarning("Please enter a valid username.");
      return;
    }

    console.log(username);
    // Call Redux function
  };

  return (
    <section className="homepage">
      <section className="homepage__login">
        <section className="homepage__login__form">
          <Form
            username={username}
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

import * as React from "react";

import "./form.scss";

interface formProps {
  username: string;
  warning: string;
  handleChange: (e: any) => void;
  handleSubmit: (e: any) => void;
}

const Form = ({ username, warning, handleChange, handleSubmit }: formProps) => {
  console.log(username, warning, handleChange, handleSubmit);

  return (
    <section className="form">
      <h3>
        Welcome, <span>{username}</span>!
      </h3>
      <p>
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Voluptatem
        perferendis voluptates, distinctio animi molestiae ducimus maiores
        repellendus alias deleniti.
      </p>
      {warning && <article className="form__warning">{warning}</article>}
      <form className="form__form" onSubmit={(e: any) => handleSubmit(e)}>
        <label>Username..</label>
        <input
          type="text"
          value={username}
          maxLength={20}
          onChange={(e: any) => handleChange(e)}
          placeholder="Enter your username.."
        />
        <input type="submit" value="Enter chatroom" />
      </form>
    </section>
  );
};

export default Form;

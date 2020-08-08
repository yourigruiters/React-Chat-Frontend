import * as React from "react";

import "./form.scss";

interface formProps {
  userInput: string;
  warning: string;
  handleChange: (e: any) => void;
  handleSubmit: (e: any) => void;
}

const Form: React.FC<formProps> = ({
  userInput,
  warning,
  handleChange,
  handleSubmit
}: formProps) => {
  return (
    <section className="form">
      <h3 data-cyid="homepage-username">
        Welcome, <span>{userInput}</span>!
      </h3>
      <p>
        We&apos;re glad to see you at the entrance of our chat application.
        Please feel free to change the predefined &apos;visitor&apos; to a
        username of your liking before entering the chatroom.
      </p>
      {warning && (
        <article className="form__warning" data-cyid="homepage-warning">
          {warning}
        </article>
      )}
      <form className="form__form" onSubmit={(e: any) => handleSubmit(e)}>
        <label>Username..</label>
        <input
          type="text"
          value={userInput}
          maxLength={20}
          onChange={(e: any) => handleChange(e)}
          placeholder="Enter your username.."
          data-cyid="homepage-input"
        />
        <input
          type="submit"
          value="Enter chatroom"
          data-cyid="homepage-button"
        />
      </form>
    </section>
  );
};

export default Form;

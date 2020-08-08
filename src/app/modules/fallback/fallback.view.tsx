import * as React from "react";

import "./fallback.view.scss";
import { Link } from "react-router-dom";

const FallbackView: React.FC = () => {
  return (
    <section className="fallback">
      <article className="fallback__content">
        <h2 data-cyid="fallback-title">404 - Not found</h2>
        <p>
          Sorry, the page you are trying to enter does not exist. Please
          navigate{" "}
          <Link to="/" data-cyid="fallback-link">
            back to the homepage
          </Link>{" "}
          and continue from there.
        </p>
      </article>
    </section>
  );
};

export default FallbackView;

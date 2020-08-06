import * as React from "react";

import "./fallback.view.scss";

const FallbackView = () => {
  // FIX: Close connection, remove username. User can navigate to homepage
  return <section className="fallback">Fallback</section>;
};

export default FallbackView;

import * as React from "react";

import Logo from "../../../assets/images/ubiquiti-logo.png";

import "./header.scss";

const Header = () => {
  return (
    <header className="header">
      <section className="header__logo">
        <img src={Logo} alt="logo" />
      </section>
    </header>
  );
};

export default Header;

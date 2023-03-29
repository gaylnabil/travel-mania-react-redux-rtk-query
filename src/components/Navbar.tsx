import React, { FC } from "react";
import { PUBLIC_URL } from "../Constants";

const Navbar: FC = () => {
  return (
    <nav className="navbar navbar-dark bg-dark">
      <div className="container-fluid">
        <a className="navbar-brand" href="/">
          <img
            className="nav-img ml"
            src={`${PUBLIC_URL}/logo192.png`}
            alt="Logo"
            width="32px"
          />
          <span className="text-white ms-2">Travel Mania</span>
        </a>
      </div>
    </nav>
  );
};

export default Navbar;

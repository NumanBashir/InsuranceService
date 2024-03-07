import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="app-header m-6">
      <Link to="/">
        <img src="src/assets/top_logo.png" className="w-64" />
      </Link>
    </header>
  );
};

export default Header;

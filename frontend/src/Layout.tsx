import React from "react";
import Header from "./components/Header";
import BlueRect from "./components/BlueRect";

type LayoutProps = {
  children: React.ReactNode;
};

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <>
      <Header />
      <BlueRect />
      <main>{children}</main>
    </>
  );
};

export default Layout;

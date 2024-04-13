import React from "react";
import Header from "./components/Header";
import BlueRect from "./components/BlueRect";
import FooterComponent from "./components/FooterComponent";

type LayoutProps = {
  children: React.ReactNode;
};

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <>
      <Header />
      <BlueRect />
      <main>{children}</main>
      <FooterComponent />
    </>
  );
};

export default Layout;

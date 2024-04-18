import React from "react";
import Header from "./components/Header";
import BlueRect from "./components/BlueRect";
import FooterComponent from "./components/FooterComponent";

type LayoutProps = {
  children: React.ReactNode;
};

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <BlueRect />
      <main className="flex-grow -mt-72">{children}</main>
      <FooterComponent />
    </div>
  );
};
export default Layout;

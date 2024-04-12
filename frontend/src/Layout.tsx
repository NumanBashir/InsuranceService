import React from "react";
import Header from "./components/Header";
import BlueRect from "./components/BlueRect";

type LayoutProps = {
  children: React.ReactNode;
};

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <BlueRect />
      <main className="flex-grow -mt-72">{children}</main>
    </div>
  );
};
export default Layout;

import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Header from "./components/Header";
import FooterComponent from "./components/FooterComponent";
import Button from "./components/Button";
type LayoutProps = {
  children: React.ReactNode;
};

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const showButton = location.pathname !== "/";

  const handleClick = () => {
    localStorage.removeItem("user");
    navigate("/", { replace: true });
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      {showButton && (
        <div className="p-8 flex items-start justify-end absolute top-[-10px] right-10">
          <Button
            text="Log ud"
            className="text-black border-tertiary bg-white hover:bg-[#e6ecf0] focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50"
            onClick={handleClick}
          />
        </div>
      )}
      <div className="h-72 bg-primary"></div>
      <main className="flex-grow -mt-72">{children}</main>
      <FooterComponent />
    </div>
  );
};

export default Layout;

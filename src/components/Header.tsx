import React from "react";
import { useLocation } from "react-router-dom";

const Header: React.FC = () => {
  const location = useLocation();
  const path = location.pathname;

  let headerText;

  switch (true) {
    case path === "/":
    case path.startsWith("/add-contact"):
    case path.startsWith("/edit-contact"):
      headerText = "Contact Page";
      break;
    case path === "/chart-map":
      headerText = "Charts and Maps";
      break;
    default:
      headerText = "Page Not Found";
  }

  return (
    <div className="flex justify-center items-center pt-1 pb-3 sm:pb-4 tracking-[3px] border-b border-b-[#1C1C1C] border-opacity-[10%]">
      <h1 className="text-center font-extrabold text-[36px] sm:text-[48px]">
        {headerText}
      </h1>
    </div>
  );
};

export default Header;

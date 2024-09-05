import React, { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import person from "../assets/icons/Sidebar/person.svg";
import contact from "../assets/icons/Sidebar/contact.svg";
import kube from "../assets/icons/Sidebar/kube.svg";

interface SidebarProps {
  isOpen: boolean;
  windowWidth: number;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, windowWidth }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [selected, setSelected] = React.useState<string>(location.pathname);

  useEffect(() => {
    setSelected(location.pathname);
  }, [location.pathname]);

  const handleNavigation = (path: string) => {
    navigate(path);
    setSelected(path);
  };

  return (
    <div
      className={`${
        windowWidth < 768
          ? `fixed top-0 left-0 h-full bg-white shadow-lg transition-transform duration-300 ease-in-out z-40 ${
              isOpen ? "translate-x-0" : "-translate-x-full"
            } w-[250px]`
          : "relative h-full bg-white w-full"
      }`}
    >
      <div className="py-5 px-4">
        <div className="flex gap-x-2 p-1 items-center mb-4">
          <img alt="" src={person} loading="lazy" />
          <h2 className="text-[14px] leading-5 font-normal text-[#1C1C1C]">
            Admin
          </h2>
        </div>

        <h4 className="mb-1 py-[5px] px-[13px] text-sm font-normal text-[#1C1C1C] opacity-[40%]">
          Pages
        </h4>

        <div className="mb-9">
          <div
            className={`w-[180px] relative mb-2 py-1 px-7 flex gap-x-1 items-center cursor-pointer ${
              selected === "/" ? "bg-[#1C1C1C] bg-opacity-[5%] rounded-lg" : ""
            }`}
            onClick={() => handleNavigation("/")}
          >
            <img alt="" className="w-5 h-5" src={contact} />
            <h4 className="text-sm font-normal text-[#1C1C1C]">Contact</h4>
            {selected === "/" && (
              <div className="left-0 rounded absolute w-1 h-4 bg-[#1C1C1C]"></div>
            )}
          </div>

          <div
            className={`w-[180px] relative mb-2 py-1 px-7 flex gap-x-1 items-center cursor-pointer ${
              selected === "/chart-map"
                ? "bg-[#1C1C1C] bg-opacity-[5%] rounded-lg"
                : ""
            }`}
            onClick={() => handleNavigation("/chart-map")}
          >
            <img alt="" className="w-5 h-5" src={kube} />
            <h4 className="text-sm font-normal text-[#1C1C1C]">ChartMap</h4>
            {selected === "/chart-map" && (
              <div className="left-0 rounded absolute w-1 h-4 bg-[#1C1C1C]"></div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;

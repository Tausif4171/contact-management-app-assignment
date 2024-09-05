import React, { useState, useEffect, useRef } from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faChevronLeft } from "@fortawesome/free-solid-svg-icons";

const Layout: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
  const [windowWidth, setWindowWidth] = useState<number>(window.innerWidth);
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(true);
  const sidebarRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);

      // Automatically close sidebar on screens smaller than 768px
      if (window.innerWidth < 768) {
        setIsSidebarOpen(false);
      } else {
        setIsSidebarOpen(true);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleSidebar = (event: React.MouseEvent) => {
    event.stopPropagation();
    setIsSidebarOpen(!isSidebarOpen);
  };

  // Handle clicks outside the sidebar to close it
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node) &&
        windowWidth < 768 &&
        isSidebarOpen
      ) {
        setIsSidebarOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isSidebarOpen, windowWidth]);

  return (
    <div className="mx-auto h-[100vh] w-[100%] relative">
      <Header />

      {/* Toggle button for mobile view */}
      {windowWidth < 768 && (
        <button
          onClick={toggleSidebar}
          ref={buttonRef}
          className="p-2 w-10 bg-gray-500 text-white fixed bottom-4 left-4 z-50 rounded-full"
        >
          <FontAwesomeIcon icon={isSidebarOpen ? faChevronLeft : faBars} />
        </button>
      )}

      <div
        className={`grid ${windowWidth >= 768 ? "grid-cols-[1fr_5fr]" : ""}`}
      >
        {/* Sidebar */}
        <div ref={sidebarRef}>
          <Sidebar isOpen={isSidebarOpen} windowWidth={windowWidth} />
        </div>

        {/* Main content */}
        <div className="w-full">{children}</div>
      </div>
    </div>
  );
};

export default Layout;

import React from "react";
import Navbar from "../../components/Navbar/Navbar";
import { Outlet } from "react-router-dom";
import Footer from "../../components/Footer/Footer";
import DarkMode from "../../components/DarkMode/DarkMode";

export default function Layout() {
  return (
    <>
      <Navbar />
      {/* <DarkMode /> */}
      <div className="text-center container mx-auto">
        <Outlet />
      </div>
      <Footer />
    </>
  );
}

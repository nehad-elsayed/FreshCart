import React, { useContext } from "react";
import "./Navbar.module.css";
import {
  Navbar as HeroNavbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
  Button,
} from "@heroui/react";
import { Link, useNavigate } from "react-router-dom";
import { label } from "framer-motion/client";
import { authContext } from "../../contexts/authContext";
import { useSelector } from "react-redux";
import { DarkModeContext } from "../../contexts/DarkMode.context";
// import cookies from "cookies";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const { isLoggedIn, setIsLoggedIn } = useContext(authContext);
  const navigate = useNavigate();
  const { darkMode, setDarkMode } = useContext(DarkModeContext);
  // const {counter}=useSelector((store)=>{
  //   return store.counter
  // })

  const menuItems = [
    { label: "Home", href: "/" }, //elobject 3bara 3n item wa7ed //to get label or href we write (item.property)
    { label: "Brands", href: "brands" },
    { label: "Categories", href: "categories" },
    { label: "Cart", href: "cart" },
    { label: "Orders", href: "/allorders" },
    { label: "Products", href: "/products" },
  ];

  function logout() {
    setIsLoggedIn(false);
    localStorage.removeItem("token");
    navigate("/signin");
  }

  return (
    <>
      <HeroNavbar
        className="border-b border-divider dark:bg-slate-800 dark:text-yellow-500"
        isMenuOpen={isMenuOpen}
        onMenuOpenChange={setIsMenuOpen}
      >
        <NavbarContent>
          <NavbarMenuToggle
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            className="sm:hidden"
          />
          <NavbarBrand>
            <Link to={"/"} className="font-bold text-inherit text-red-500 dark:text-yellow-500 sm:text-[16px] lg:text-2xl">
              FreshCart
            </Link>
          </NavbarBrand>
        </NavbarContent>
        {isLoggedIn && (
          <NavbarContent className="hidden sm:flex gap-2" justify="center">
            {menuItems.map((item, index) => {
              return (
                <NavbarItem key={index}>
                  <Link
                    className="text-red-500 dark:text-yellow-500"
                    to={item.href}
                  >
                    {item.label}
                  </Link>
                </NavbarItem>
              );
            })}
          </NavbarContent>
        )}
        {isLoggedIn ? (
          <NavbarContent className="md:justify-center lg:justify-end">
            <NavbarItem>
              <Link
                to={"/wishlist"}
                className="my-2 text-red-800 dark:text-red-500"
                variant="ghost"
                color="dark:danger"
              >
                <span className=" p-1 ">
                 <i className="fa-solid fa-heart me-1"></i>List
                </span>
              </Link>
            </NavbarItem>

            <NavbarItem>
              <Button
                onPress={logout}
                type="button"
                color="danger"
                className="dark:text-red-600 sm:me-1"
                href="#"
                variant="flat"
              >
                Log Out
              </Button>
            </NavbarItem>

            <NavbarItem>
              <button
                onClick={() => {
                  setDarkMode(!darkMode);
                }}
                className="p-2 rounded-md bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white"
              >
                {darkMode ? "☀️" : " 🌙"}
              </button>
            </NavbarItem>
          </NavbarContent>
        ) : (
          //else (:) here
          <NavbarContent justify="end">
            <NavbarItem className=" lg:flex">
              <Link to={"/signin"}>Login</Link>
            </NavbarItem>
            {/* <NavbarItem>
              <Link
                to={"/register"}
                className="bg-green-200 dark:bg-sky-700 p-2 rounded-md"
              >
                {" "}
                Sign Up
              </Link>
            </NavbarItem> */}
            <NavbarItem>
              <button
                onClick={() => {
                  setDarkMode(!darkMode);
                }}
                className=" rounded-md bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white"
              >
                {darkMode ? "☀️" : " 🌙"}
              </button>
            </NavbarItem>
          </NavbarContent>
        )}
        {isLoggedIn && (
          <NavbarMenu className="pt-8">
            {menuItems.map((item, index) => (
              <NavbarMenuItem onClick={() => setIsMenuOpen(false)} key={index}>
                <Link
                  className="w-full"
                  color={"foreground"}
                  to={item.href}
                  size="lg"
                >
                  {item.label}
                </Link>
              </NavbarMenuItem>
            ))}
          </NavbarMenu>
        )}
      </HeroNavbar>
    </>
  );
}

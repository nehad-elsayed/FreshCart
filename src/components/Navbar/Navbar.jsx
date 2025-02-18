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
// import cookies from "cookies";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const { isLoggedIn, setIsLoggedIn } = useContext(authContext);
  const navigate = useNavigate();
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
            <p className="font-bold text-inherit text-red-500 dark:text-yellow-500 text-2xl">
              FreshCart
            </p>
          </NavbarBrand>
        </NavbarContent>
        {isLoggedIn && (
          <NavbarContent className="hidden sm:flex gap-4" justify="center">
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
          <NavbarContent justify="end">
            <NavbarItem>
              <Button
                onPress={() => {
                  navigate("/wishlist");
                }}
                className="my-2 text-red-800 dark:text-red-500"
                variant="ghost"
                color="dark:danger"
              >
                <span className="sm:w-12 mx-auto md:w-20">
                  WishList <i class="fa-solid fa-heart"></i>
                </span>
              </Button>
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
          </NavbarContent>
        ) : (
          //else (:) here
          <NavbarContent justify="end">
            <NavbarItem className=" lg:flex">
              <Link to={"/signin"}>Login</Link>
            </NavbarItem>
            <NavbarItem>
              <Link
                to={"/register"}
                className="bg-green-200 dark:bg-sky-700 p-2 rounded-md"
              >
                {" "}
                Sign Up
              </Link>
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

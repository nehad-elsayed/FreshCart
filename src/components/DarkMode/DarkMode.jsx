import React, { useEffect, useState } from "react";
import "animate.css"

export default function DarkMode() {
  // Start darkMode //=====================>>>>
  const [isDarkMode, setIsDarkMode] = useState(
    localStorage.theme === "dark" ||
      (!("theme" in localStorage) &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
  );

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);

  function toggleMode() {
    setIsDarkMode((prevValue) => {
      if (!prevValue) {
        document.documentElement.classList.add("dark");
        localStorage.theme = "dark";
      } else {
        document.documentElement.classList.remove("dark");
        localStorage.theme = "light";
      }
      return !prevValue;
    });
  }
  // End DarkMode ================>>>>>
  return (
    <>
    <div className="animate__animated  animate__swing animate-slow flex items-center justify-start pr-3">
    <div className=" p-5 mb-13 mt-3">
        <div className="relative inline-block w-10 mr-2 align-middle select-none transition duration-200 ease-in">
          <input
            checked={isDarkMode}
            onChange={toggleMode}
            type="checkbox"
            name="toggle"
            id="toggle"
            className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer"
          />
          <label
            htmlFor="toggle"
            className="toggle-label block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer"
          />
        </div>
        <label
          htmlFor="toggle"
          className="text-lg text-red-500 dark:text-yellow-500"
        >
          ChangeMode
        </label>
      </div>
    </div>
    
    </>
  );
}

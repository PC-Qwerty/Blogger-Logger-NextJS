"use client";
import Image from "next/image";
import { useState, useEffect } from "react";

const ThemeSwitch = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme) {
      setIsDarkMode(storedTheme === "dark");
    } else {
      setIsDarkMode(window.matchMedia("(prefers-color-scheme: dark)").matches);
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = isDarkMode ? "light" : "dark";
    setIsDarkMode(!isDarkMode);
    localStorage.setItem("theme", newTheme);
    document.documentElement.classList.toggle("dark", isDarkMode);
  };
  interface ThemeImgProps {
    path: string;
  }

  const ThemeImg: React.FC<ThemeImgProps> = ({ path }) => (
    <Image src={path} width={32} height={32} alt="Theme Image" />
  );
  return (
    <button onClick={toggleTheme} className=" p-2 rounded-md">
      {isDarkMode ? (
        <ThemeImg path="/lightmode.svg" />
      ) : (
        <ThemeImg path="/darkmode.png" />
      )}
    </button>
  );
};

export default ThemeSwitch;

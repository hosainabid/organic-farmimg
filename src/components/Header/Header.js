import React from "react";
import User from "../User/User";
import Navbar from "./Navbar/Navbar";
import Search from "./Search/Search";

if (!window.localStorage.getItem("organicFood")) {
  localStorage.setItem("organicFood", JSON.stringify([]));
}

if (!window.localStorage.getItem("organicFoodPrebook")) {
  localStorage.setItem("organicFoodPrebook", JSON.stringify([]));
}

if (!window.localStorage.getItem("organicFoodSeeds")) {
  localStorage.setItem("organicFoodSeeds", JSON.stringify([]));
}

export default function Header() {
  return (
    <div className="bg-light py-2 shadow-sm">
      <User />
      <Navbar />
      <Search />
    </div>
  );
}

import React from "react";
import User from "../User/User";
import Navbar from "./Navbar/Navbar";
import Search from "./Search/Search";

export default function Header() {
  return (
    <div className="bg-light py-2 shadow-sm">
      <User />
      <Navbar />
      <Search />
    </div>
  );
}

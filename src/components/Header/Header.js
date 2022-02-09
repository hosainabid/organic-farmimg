import React from "react";
import Navbar from "./Navbar/Navbar";
import Search from "./Search/Search";
import UserInfo from "./UserInfo/UserInfo";

export default function Header() {
  return (
    <div className="bg-light py-2">
      <UserInfo />
      <Navbar />
      <Search />
    </div>
  );
}

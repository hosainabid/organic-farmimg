import React, { useEffect } from "react";
import SeedBag from "./SeedBag";

export default function MyBag() {
  return (
    <div className="my-4">
      <h3 className="text-center">My Bag</h3>
      <SeedBag />
    </div>
  );
}

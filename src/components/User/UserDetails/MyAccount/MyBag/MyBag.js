import React from "react";
import OrganicFoodBag from "./OrganicFoodBag";
import PreOrder from "./PreOrder";
import SeedBag from "./SeedBag";

export default function MyBag() {
  return (
    <div className="my-4">
      <h3 className="text-center">My Orders</h3>
      <SeedBag />
      <PreOrder />
      <OrganicFoodBag />
    </div>
  );
}

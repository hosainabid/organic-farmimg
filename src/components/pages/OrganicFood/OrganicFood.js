import axios from "axios";
import React, { useState, useEffect } from "react";
import Header from "../../Header/Header";
import LoadingSpinner from "../../utilities/LoadingSpinner/LoadingSpinner";
import AllOrganicFood from "./AllOrganicFood";
import rootAPI from "../../../configurables";

export default function OrganicFood() {
  const [allCrops, setAllCrops] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const loadAllCrops = async () => {
    try {
      const data = await axios.get(`${rootAPI}/all_crops`).then((res) => {
        setAllCrops(res.data.reverse());
        setIsLoading(false);
      });
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    loadAllCrops();
  }, []);

  return (
    <div>
      <Header />
      <div className="container">
        <h2 className="my-4 text-center">Organic Food</h2>
        {isLoading ? (
          <LoadingSpinner />
        ) : (
          <AllOrganicFood allCrops={allCrops} />
        )}
      </div>
    </div>
  );
}

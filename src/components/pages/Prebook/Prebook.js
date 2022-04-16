import axios from "axios";
import React, { useState, useEffect, Fragment } from "react";
import Header from "../../Header/Header";
import LoadingSpinner from "../../utilities/LoadingSpinner/LoadingSpinner";
import AllPrebookItems from "./AllPrebookItems";
import rootAPI from "../../../configurables";

export default function Prebook() {
  const [allCrops, setAllCrops] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const loadAllCrops = async () => {
    try {
      const data = await axios
        .get(`${rootAPI}/all_upcoming_products`)
        .then((res) => {
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
    <Fragment>
      <Header />
      <div className="container my-4">
        {isLoading ? (
          <LoadingSpinner />
        ) : (
          <AllPrebookItems allCrops={allCrops} />
        )}
      </div>
    </Fragment>
  );
}

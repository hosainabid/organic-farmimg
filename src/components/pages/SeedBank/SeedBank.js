import React, { useState, useEffect, Fragment } from "react";
import Header from "../../Header/Header";
import axios from "axios";
import LoadingSpinner from "../../utilities/LoadingSpinner/LoadingSpinner";
import AllSeeds from "./AllSeeds/AllSeeds";
import rootAPI from "../../../configurables";

export default function SeedBank() {
  const [isSeedLoaded, setIsSeedLoaded] = useState(false);
  const [allSeed, setAllSeed] = useState("");
  const loadAllSeed = async () => {
    try {
      await axios.get(`${rootAPI}/all_seeds`).then((res) => {
        setAllSeed(res.data);
        setIsSeedLoaded(true);
      });
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    loadAllSeed();
  }, []);
  return (
    <Fragment>
      <Header />
      <div className="container my-4">
        {isSeedLoaded ? <AllSeeds allSeed={allSeed} /> : <LoadingSpinner />}
      </div>
    </Fragment>
  );
}

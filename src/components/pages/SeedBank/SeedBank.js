import React from "react";
import Header from "../../Header/Header";
import axios from "axios";
import LoadingSpinner from "../../utilities/LoadingSpinner/LoadingSpinner";
import AllSeeds from "./AllSeeds/AllSeeds";
import rootAPI from "../../../configurables";

export default function SeedBank() {
  const [isSeedLoaded, setIsSeedLoaded] = React.useState(false);
  const [allSeed, setAllSeed] = React.useState("");
  const loadAllSeed = async () => {
    try {
      const data = await axios.get(`${rootAPI}/all_seeds`).then((res) => {
        setAllSeed(res.data);
        setIsSeedLoaded(true);
      });
    } catch (e) {
      console.log(e);
    }
  };

  React.useEffect(() => {
    loadAllSeed();
  }, []);
  return (
    <div>
      <Header />
      <h2 className="text-center my-4">Seed back</h2>
      {isSeedLoaded ? <AllSeeds allSeed={allSeed} /> : <LoadingSpinner />}
    </div>
  );
}

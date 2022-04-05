import axios from "axios";
import React, { useState } from "react";
import Header from "../../Header/Header";
import LoadingSpinner from "../../utilities/LoadingSpinner/LoadingSpinner";
import PrebookItem from "./PrebookItem";

export default function Prebook() {
  const [allCrops, setAllCrops] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const loadAllCrops = async () => {
    try {
      const data = await axios
        .get("https://shrouded-basin-02702.herokuapp.com/all_upcoming_products")
        .then((res) => {
          setAllCrops(res.data.reverse());
          setIsLoading(false);
        });
    } catch (e) {
      console.log(e);
    }
  };

  React.useEffect(() => {
    loadAllCrops();
  }, []);
  return (
    <div>
      <Header />
      <div className="container">
        <h3 className="my-4 text-center">Prebook Your Item</h3>
        <div className="row">
          {isLoading && <LoadingSpinner />}
          {allCrops ? (
            allCrops.map((crop) => (
              <div key={crop._id} className="col-lg-3 col-md-4">
                <PrebookItem crop={crop} />
              </div>
            ))
          ) : (
            <p className="text-center">No crop Available now</p>
          )}
        </div>
      </div>
    </div>
  );
}

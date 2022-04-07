import axios from "axios";
import React from "react";
import Header from "../../Header/Header";
import LoadingSpinner from "../../utilities/LoadingSpinner/LoadingSpinner";
import OrganicFoodItem from "./OrganicFoodItem";

export default function OrganicFood() {
  const [allCrops, setAllCrops] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const loadAllCrops = async () => {
    try {
      const data = await axios
        .get("https://shrouded-basin-02702.herokuapp.com/all_crops")
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
        <h3 className="my-4 text-center">Organic Food</h3>
        {isLoading && <LoadingSpinner />}
        <div className="row row-cols-1 row-cols-md-4 g-4">
          {allCrops ? (
            allCrops.map((crop) => (
              <div key={crop._id} className="col">
                <OrganicFoodItem crop={crop} />
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

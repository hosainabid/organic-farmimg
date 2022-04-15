import axios from "axios";
import React, { useState } from "react";
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

  React.useEffect(() => {
    loadAllCrops();
  }, []);
  return (
    <div>
      <Header />
      <div className="container">
        <h2 className="my-4 text-center">Prebook Your Item</h2>
        {isLoading ? (
          <LoadingSpinner />
        ) : (
          <AllPrebookItems allCrops={allCrops} />
        )}
      </div>
    </div>
  );
}

// <div className="row row-cols-1 row-cols-lg-4 row-cols-md-2 g-4">
//           {allCrops ? (
//             allCrops.map((crop) => (
//               <div key={crop._id} className="col">
//                 <PrebookItem crop={crop} />
//               </div>
//             ))
//           ) : (
//             <p className="text-center">No crop Available now</p>
//           )}
//         </div>

import axios from "axios";
import React, { useEffect, useState, Fragment } from "react";
import Header from "../../Header/Header";
import LoadingSpinner from "../../utilities/LoadingSpinner/LoadingSpinner";
import Weather from "./Weather";

export default function Home() {
  const [isAPILoaded, setIsAPILoaded] = useState(false);
  const [locationData, setLocationData] = useState();

  useEffect(() => {
    axios.get("https://api.npoint.io/d9e2be545bf3f235e5df").then((response) => {
      setLocationData(response.data);
      setIsAPILoaded(true);
    });
  }, []);

  return (
    <Fragment>
      <Header />
      {isAPILoaded ? (
        <Weather locationData={locationData.data} />
      ) : (
        <div className="my-4">
          <LoadingSpinner />
        </div>
      )}
    </Fragment>
  );
}

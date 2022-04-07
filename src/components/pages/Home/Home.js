import React, { useEffect, useState, Fragment } from "react";
import Weather from "../../Weather/Weather";
import Header from "../../Header/Header";

export default function Home() {
  // const [isAllLoaded, setIsAllLodaded] = useState(false);

  // useEffect(() => {
  //   let one = "https://shrouded-basin-02702.herokuapp.com";
  //   let two = "https://shrouded-basin-02702.herokuapp.com";
  //   let three = "https://shrouded-basin-02702.herokuapp.com";

  //   const requestOne = axios.get(one);
  //   const requestTwo = axios.get(two);
  //   const requestThree = axios.get(three);

  //   axios
  //     .all([requestOne, requestTwo, requestThree])
  //     .then(
  //       axios.spread((...responses) => {
  //         const responseOne = responses[0];
  //         const responseTwo = responses[1];
  //         const responesThree = responses[2];
  //         // use/access the results
  //       })
  //     )
  //     .catch((errors) => {
  //       // react on errors.
  //     });
  // }, []);
  return (
    <Fragment>
      <Header />
      <Weather />
    </Fragment>
  );
}

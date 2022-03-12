import React from "react";
import SingleSeed from "../SingleSeed/SingleSeed";

export default function AllSeeds({ allSeed }) {
  return (
    <div className="container">
      {allSeed.length ? (
        allSeed.map((seed) => <SingleSeed seed={seed} />)
      ) : (
        <p className="text-center">Currently No Seed Available...</p>
      )}
    </div>
  );
}

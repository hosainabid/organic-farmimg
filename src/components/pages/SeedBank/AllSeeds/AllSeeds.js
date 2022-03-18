import React from "react";
import SingleSeed from "../SingleSeed/SingleSeed";

export default function AllSeeds({ allSeed }) {
  return (
    <div className="container">
      {allSeed.length ? (
        <div className="row">
          {allSeed.map((seed) => (
            <div className="col-md-3">
              <SingleSeed seed={seed} key={seed._id} />
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center">Currently No Seed Available...</p>
      )}
    </div>
  );
}

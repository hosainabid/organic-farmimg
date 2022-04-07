import React from "react";
import SingleSeed from "../SingleSeed/SingleSeed";

export default function AllSeeds({ allSeed }) {
  return (
    <div className="container">
      {allSeed.length ? (
        <div className="row row-cols-1 row-cols-md-4 g-4">
          {allSeed.map((seed) => (
            <div key={seed._id} className="col">
              <SingleSeed seed={seed} />
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center">Currently No Seed Available...</p>
      )}
    </div>
  );
}

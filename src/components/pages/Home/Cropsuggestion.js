import React, { Fragment } from "react";

export default function Cropsuggestion({
  divisionID,
  monthNames,
  locationData,
}) {
  return (
    <Fragment>
      <h3 className="text-center my-4">Crop Suggstion</h3>
      <div className="card-group justify-content-center">
        {locationData.divisions[Number(divisionID) - 94].crops[monthNames].map(
          (item) => {
            return (
              <div
                key={item.img}
                className="col-lg-3 col-md-4 col-sm-6 mx-2 my-3"
              >
                <div className="card h-100">
                  <div className="card-img-top p-1">
                    <img
                      className="img-fluid rounded border"
                      src={item.img}
                      alt="Card image cap"
                    />
                  </div>
                  <div className="card-body">
                    <h5 className="card-title">{item.name}</h5>
                    <div className="card-text">
                      <p>
                        <span className="fw-bold">Sowing Time: </span>
                        {item.Seed_sowing_time}.
                      </p>
                      <p>
                        <span className="fw-bold">Soil Type: </span>
                        {item.soil_type}.
                      </p>
                      <p>
                        <span className="fw-bold">Needed Seed: </span>
                        {item.estimated_seed_amount}.
                      </p>
                      <p>
                        <span className="fw-bold">Harvestin Time: </span>
                        {item.estimated_harvesting_time}.
                      </p>
                      <p>
                        <span className="fw-bold">Estimated Fertilizer: </span>
                        {item.estimated_fertilizer}.
                      </p>
                      <p>
                        <span className="fw-bold">Production: </span>
                        {item.estimated_production}.
                      </p>
                      <p>
                        <span className="fw-bold">Fertilizers: </span>
                        {item.fertilizers}.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            );
          }
        )}
      </div>
    </Fragment>
  );
}

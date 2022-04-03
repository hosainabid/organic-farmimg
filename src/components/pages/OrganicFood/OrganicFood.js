import axios from "axios";
import React from "react";
import Header from "../../Header/Header";
import LoadingSpinner from "../../utilities/LoadingSpinner/LoadingSpinner";

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

  if (!window.localStorage.getItem("organicFood")) {
    localStorage.setItem("organicFood", JSON.stringify([]));
  }

  React.useEffect(() => {
    loadAllCrops();
  }, []);

  return (
    <div>
      <Header />
      <div className="container">
        <h3 className="my-4 text-center">Organic Food</h3>
        <div className="row">
          {isLoading && <LoadingSpinner />}
          {allCrops ? (
            allCrops.map((crop) => (
              <div key={crop._id} className="col-lg-3 col-md-4">
                <div className="p-3 card-group">
                  <div className="card p-1 shadow">
                    <img
                      className="card-img-top"
                      src={`data:image/png;base64,${crop.image.img}`}
                      alt=""
                    />
                    <div className="card-body">
                      <h5 className="card-title">{crop.name}</h5>
                      <div className="card-text">
                        <p className="py-1">
                          Unit Quantity:{" "}
                          <span className="text-success fw-bold">
                            {crop.quantity}
                          </span>
                        </p>

                        <p className="py-1">
                          Item left:{" "}
                          <span className="text-warning fw-bold">
                            {crop.stock}{" "}
                          </span>
                          Unit
                        </p>
                        <p className="py-1">
                          Farmer Name:{" "}
                          <span className="fw-bold">{crop.farmerName}</span>
                        </p>
                      </div>
                      <p className="py-1">
                        Item left:{" "}
                        <span className="text-warning fw-bold">
                          {crop.price}{" "}
                        </span>
                        Tk
                      </p>
                      <div className="d-flex justify-content-center mt-3">
                        <button type="button" className="list-btn px-3 py-2">
                          Add to Cart
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
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

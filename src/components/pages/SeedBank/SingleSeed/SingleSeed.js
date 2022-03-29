import React from "react";
import useAuth from "../../../../hooks/useAuth";

export default function SingleSeed({ seed }) {
  const { setIsCartUpdated } = useAuth();
  function addToCartHandler(seed) {
    let seedJSON = JSON.parse(window.localStorage.getItem("organicFoodSeeds"));
    if (seedJSON.length === 0) {
      localStorage.setItem(
        "organicFoodSeeds",
        JSON.stringify([{ ...seed, quantity: 1 }])
      );
    } else {
      const isSeedAlreadyExist = seedJSON.find(
        (prev) => prev.seed._id === seed.seed._id
      );

      if (isSeedAlreadyExist) {
        seedJSON.find((prev) => {
          if (prev.seed._id === seed.seed._id) {
            prev.quantity = prev.quantity + 1;
            localStorage.setItem(
              "organicFoodSeeds",
              JSON.stringify([...seedJSON])
            );
          }
        });
      } else {
        localStorage.setItem(
          "organicFoodSeeds",
          JSON.stringify([...seedJSON, { ...seed, quantity: 1 }])
        );
      }
    }
    setIsCartUpdated((prev) => !prev);
  }

  return (
    <div className="p-3">
      <div className="card p-1">
        <img
          className="img-fluid rounded"
          src={`data:image/png;base64,${seed.image.img}`}
          alt=""
        />
        <div className="card-body">
          <h5 className="card-title">{seed.name}</h5>
          <div className="card-text">
            <p className="py-1">
              Unit Quantity:{" "}
              <span className="text-success fw-bold">{seed.quantity}</span>
            </p>
            <p className="py-1">
              Item left:{" "}
              <span className="text-warning fw-bold">{seed.stock}</span>
            </p>
          </div>
          <div className="d-flex justify-content-center mt-3">
            <button
              onClick={() => addToCartHandler({ seed })}
              type="button"
              className="list-btn px-3 py-2"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

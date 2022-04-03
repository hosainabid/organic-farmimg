import React, { useState, useEffect } from "react";
import useAuth from "../../../../hooks/useAuth";

export default function SingleSeed({ seed }) {
  const { setIsCartUpdated } = useAuth();
  const [addCounter, setAddCounter] = useState(0);
  useEffect(() => {
    let seedJSON = JSON.parse(window.localStorage.getItem("organicFoodSeeds"));
    if (seedJSON.length > 0) {
      seedJSON.map((item) => {
        if (item.seed._id === seed._id) {
          setAddCounter(item.quantity);
        }
      });
    }
  }, []);
  function addToCartHandler(seed) {
    let seedJSON = JSON.parse(window.localStorage.getItem("organicFoodSeeds"));
    if (seedJSON.length === 0) {
      localStorage.setItem(
        "organicFoodSeeds",
        JSON.stringify([{ ...seed, quantity: 1 }])
      );
      setAddCounter(1);
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
            setAddCounter(prev.quantity);
          }
        });
      } else {
        localStorage.setItem(
          "organicFoodSeeds",
          JSON.stringify([...seedJSON, { ...seed, quantity: 1 }])
        );
        setAddCounter(1);
      }
    }
    setIsCartUpdated((prev) => !prev);
  }

  const subtractFromCartHandler = (seed) => {
    let seedJSON = JSON.parse(window.localStorage.getItem("organicFoodSeeds"));
    seedJSON.map((prev, index) => {
      if (prev.seed._id === seed._id) {
        prev.quantity = prev.quantity - 1;
        if (prev.quantity > 0) {
          localStorage.setItem(
            "organicFoodSeeds",
            JSON.stringify([...seedJSON])
          );
        } else {
          seedJSON.splice(index, 1);
          localStorage.setItem(
            "organicFoodSeeds",
            JSON.stringify([...seedJSON])
          );
        }
        setAddCounter(prev.quantity);
      }
    });
    setIsCartUpdated((prev) => !prev);
  };

  return (
    <div className="p-3">
      <div className="card p-1">
        <img
          className="card-img-top"
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
            <p className="py-1">
              Unit Price:{" "}
              <span className=" h4 text-warning fw-bold text-danger">
                {seed.price}{" "}
              </span>
              Tk
            </p>
          </div>
          <div className="d-flex justify-content-center mt-3">
            {addCounter ? (
              <div className="btn-group" role="group">
                <button
                  onClick={() => subtractFromCartHandler(seed)}
                  type="button"
                  className="btn subtract-btn"
                >
                  -
                </button>
                <button type="button" className="btn px-3" disabled>
                  {addCounter}
                </button>
                <button
                  onClick={() => addToCartHandler({ seed })}
                  type="button"
                  className="btn add-btn"
                >
                  +
                </button>
              </div>
            ) : (
              <button
                onClick={() => addToCartHandler({ seed })}
                type="button"
                className="list-btn px-3 py-2"
              >
                Add to Cart
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

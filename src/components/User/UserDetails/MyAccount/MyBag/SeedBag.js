import axios from "axios";
import React, { useState, useEffect, Fragment } from "react";
import useAuth from "../../../../../hooks/useAuth";

export default function SeedBag() {
  const [seedsInCart, setSeedsInCart] = useState([]);
  const { user, isCartUpdated, setIsCartUpdated } = useAuth();
  const [seedSubtotal, setSeedSubtotal] = useState(0);
  const [seedTotal, setSeedTotal] = useState(0);
  const [quickShipping, setQuickShipping] = useState(false);
  useEffect(() => {
    setSeedsInCart(JSON.parse(localStorage.getItem("organicFoodSeeds")));
    const availableSeeds = JSON.parse(localStorage.getItem("organicFoodSeeds"));
    let seedsPrice = 0;
    availableSeeds.map((product) => {
      seedsPrice = seedsPrice + product.seed.price * product.quantity;
    });
    setSeedSubtotal(seedsPrice);
    if (quickShipping) {
      setSeedTotal(seedsPrice + 150);
    } else {
      setSeedTotal(seedsPrice + 100);
    }
  }, [isCartUpdated, quickShipping]);

  const deleteFromCartHandler = (index) => {
    const prevOrganicFoodSeeds = JSON.parse(
      localStorage.getItem("organicFoodSeeds")
    );
    prevOrganicFoodSeeds.splice(index, 1);
    localStorage.setItem(
      "organicFoodSeeds",
      JSON.stringify([...prevOrganicFoodSeeds])
    );
    setSeedsInCart(JSON.parse(localStorage.getItem("organicFoodSeeds")));
    setIsCartUpdated((prevState) => !prevState);
  };

  const updateFromCart = (index, value) => {
    const prevOrganicFoodSeeds = JSON.parse(
      localStorage.getItem("organicFoodSeeds")
    );
    prevOrganicFoodSeeds[index].quantity = parseInt(value);

    localStorage.setItem(
      "organicFoodSeeds",
      JSON.stringify([...prevOrganicFoodSeeds])
    );

    setSeedsInCart(JSON.parse(localStorage.getItem("organicFoodSeeds")));
    setIsCartUpdated((prevState) => !prevState);
  };

  const placeSeedsOrder = () => {
    const orderedSeeds = JSON.parse(localStorage.getItem("organicFoodSeeds"));
    axios
      .post("https://shrouded-basin-02702.herokuapp.com/place_order", {
        productDetails: orderedSeeds,
        userId: user._id,
        userName: user.name,
        userEmail: user.email,
        mobile: user.mobile,
        orderStatus: 1,
      })
      .then((response) => {
        console.log(response);
        localStorage.setItem("organicFoodSeeds", JSON.stringify([]));
        setIsCartUpdated((prev) => !prev);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Fragment>
      {Boolean(seedsInCart.length) && (
        <div className="rounded border p-3 my-5">
          <h4 className="fw-light">Added seeds in cart</h4>
          <div className="table-responsive">
            <table className="mt-3 table table-borderless">
              <thead>
                <tr>
                  <th scope="col"></th>
                  <th scope="col">Product</th>
                  <th scope="col">Price(unit)</th>
                  <th scope="col">Quality</th>
                  <th scope="col">Total</th>
                </tr>
              </thead>

              <tbody>
                {seedsInCart.map((product, index) => {
                  return (
                    <tr key={product.seed._id}>
                      <td className="d-flex justify-content-center">
                        <button
                          onClick={() => deleteFromCartHandler(index)}
                          className="border rounded cart-product-delete-btn p-2"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="25"
                            height="25"
                            fill="currentColor"
                            className="bi bi-trash-fill "
                            viewBox="0 0 16 16"
                          >
                            <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z" />
                          </svg>
                        </button>
                      </td>
                      <td>
                        <div className="d-flex">
                          <div className="cart-product-img mx-3">
                            <img
                              className="img-fluid rounded"
                              src={`data:image/png;base64,${product.seed.image.img}`}
                              alt={product.seed.name}
                            />
                          </div>
                          <div className="cart-product-name text-capitalize mx-3 fw-bold">
                            {product.seed.name}
                          </div>
                        </div>
                      </td>
                      <td>
                        <span className="fw-bold h5">{product.seed.price}</span>{" "}
                        {" Tk"}
                      </td>
                      <td className="fw-bold">
                        <input
                          className="form-control cart-product-quantity-field"
                          type="number"
                          defaultValue={product.quantity}
                          min={1}
                          onChange={(e) =>
                            updateFromCart(index, e.target.value)
                          }
                        />
                      </td>
                      <td>
                        <span className="h5">
                          {product.seed.price * product.quantity}
                        </span>
                        {" Tk"}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <hr />
          <div className="row align-items-center">
            <div className="col-md-6 px-3">
              <p className="h5 fw-bold text-secondary">
                Total Product Cost:{" "}
                <span className="h4 text-info">{seedSubtotal}</span> {" Tk"}
              </p>
              <p className="h5 fw-bold text-secondary pb-1">
                Shipping Charge:{" "}
                <span className="h4 text-info">
                  {quickShipping ? "150" : "100"}
                </span>{" "}
                {" Tk"}
              </p>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="seedQuickDelivary"
                  onChange={(e) => setQuickShipping(e.target.checked)}
                />
                <label className="form-check-label" htmlFor="seedQuickDelivary">
                  Get Delivary within 24h
                </label>
              </div>
              <hr />
              <p className="h5 fw-bold text-secondary">
                Total: <span className="h4 text-info">{seedTotal}</span> {" Tk"}
              </p>
            </div>

            <div className="col-md-6 px-3 text-center">
              <button
                onClick={placeSeedsOrder}
                type="button"
                className="list-btn px-5 py-2 mt-sm-4"
              >
                Place Seeds Order
              </button>
            </div>
          </div>
        </div>
      )}
    </Fragment>
  );
}

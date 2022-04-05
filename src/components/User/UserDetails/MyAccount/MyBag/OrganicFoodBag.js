import React, { Fragment, useState, useEffect } from "react";
import useAuth from "../../../../../hooks/useAuth";

export default function OrganicFoodBag() {
  const [organicFoodItems, setOrganicFoodItems] = useState(
    JSON.parse(localStorage.getItem("organicFood"))
  );
  const [organicFoodSubtotal, setOrganicFoodSubtotal] = useState(0);
  const [quickShipping, setQuickShipping] = useState(false);
  const [organicFoodTotal, setOrganicFoodTotal] = useState(0);
  const { isCartUpdated, setIsCartUpdated } = useAuth();

  useEffect(() => {
    setOrganicFoodItems(JSON.parse(localStorage.getItem("organicFood")));
    let organicFoodItemsPrice = 0;
    organicFoodItems.map((product) => {
      organicFoodItemsPrice =
        organicFoodItemsPrice + product.cropDetails.price * product.quantity;
    });
    setOrganicFoodSubtotal(organicFoodItemsPrice);
    if (quickShipping) {
      setOrganicFoodTotal(organicFoodItemsPrice + 150);
    } else {
      setOrganicFoodTotal(organicFoodItemsPrice + 100);
    }
  }, [isCartUpdated, quickShipping]);

  const deleteFromPrebookItems = (index) => {
    const prevOrganicFoodItems = JSON.parse(
      localStorage.getItem("organicFood")
    );

    prevOrganicFoodItems.splice(index, 1);
    localStorage.setItem(
      "organicFood",
      JSON.stringify([...prevOrganicFoodItems])
    );
    setOrganicFoodItems(JSON.parse(localStorage.getItem("organicFood")));
    setIsCartUpdated((prevState) => !prevState);
  };

  const updatePrebookItem = (index, value) => {
    const prevOrganicFoodItems = JSON.parse(
      localStorage.getItem("organicFood")
    );
    prevOrganicFoodItems[index].quantity = parseInt(value);
    localStorage.setItem(
      "organicFood",
      JSON.stringify([...prevOrganicFoodItems])
    );

    setOrganicFoodItems(JSON.parse(localStorage.getItem("organicFood")));
    setIsCartUpdated((prevState) => !prevState);
  };

  return (
    <Fragment>
      {Boolean(organicFoodItems.length) && (
        <div className="rounded border p-3 my-5">
          <h4 className="fw-light mt-3">Added Organic Foods in cart</h4>

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
                {organicFoodItems.map((product, index) => {
                  return (
                    <tr key={product.cropDetails._id}>
                      <td className="d-flex justify-content-center">
                        <button
                          onClick={() => deleteFromPrebookItems(index)}
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
                              src={`data:image/png;base64,${product.cropDetails.image.img}`}
                              alt={product.cropDetails.name}
                            />
                          </div>
                          <div className="cart-product-name text-capitalize mx-3 fw-bold">
                            {product.cropDetails.name}
                          </div>
                        </div>
                      </td>
                      <td>
                        <span className="fw-bold h5">
                          {product.cropDetails.price}
                        </span>{" "}
                        {" Tk"}
                      </td>
                      <td className="fw-bold">
                        <input
                          className="form-control cart-product-quantity-field"
                          type="number"
                          defaultValue={product.quantity}
                          min={1}
                          onChange={(e) =>
                            updatePrebookItem(index, e.target.value)
                          }
                        />
                      </td>
                      <td>
                        <span className="h5">
                          {product.cropDetails.price * product.quantity}
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
                <span className="h4 text-info">{organicFoodSubtotal}</span>{" "}
                {" Tk"}
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
                  id="organicFoodQuickDelivary"
                  onChange={(e) => setQuickShipping(e.target.checked)}
                />
                <label
                  className="form-check-label"
                  htmlFor="organicFoodQuickDelivary"
                >
                  Get Delivary within 24h
                </label>
              </div>
              <hr />
              <p className="h5 fw-bold text-secondary">
                Total: <span className="h4 text-info">{organicFoodTotal}</span>{" "}
                {" Tk"}
              </p>
            </div>

            <div className="col-md-6 px-3 text-center">
              <button type="button" className="list-btn px-5 py-2">
                Place Organic Foods Order
              </button>
            </div>
          </div>
        </div>
      )}
    </Fragment>
  );
}

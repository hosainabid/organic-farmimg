import React from "react";

export default function SingleSeed({ seed }) {
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
            <button type="button" className="list-btn px-3 py-2">
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

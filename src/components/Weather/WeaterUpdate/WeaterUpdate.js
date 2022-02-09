import React from "react";

export default function WeaterUpdate() {
  return (
    <div className="row m-3 justify-content-center align-items-center">
      <div className="col-3 border-end">
        <p>Max</p>
        <p>
          25<span>&#176;</span>
        </p>
      </div>
      <div className="col-3 border-end">
        <p>Min</p>
        <p>
          18<span>&#176;</span>
        </p>
      </div>
      <div className="col-3">
        <p>Humidity</p>
        <p>60%</p>
      </div>
    </div>
  );
}

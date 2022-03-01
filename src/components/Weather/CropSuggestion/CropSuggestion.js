import React from "react";
import "./CropSuggestion.css";

export default function CropSuggestion({ crops, monthName }) {
  return (
    <div className="row justify-content-center align-items-center my-4 crop-suggestion">
      <div className="col-lg-6">
        <h3 className="text-center">Crop Suggestions</h3>
        <ul>
          {crops[monthName].map((crop, index) => {
            return (
              <li key={index}>
                <h5>{crop.name}</h5>
                <img src={crop.img} />
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

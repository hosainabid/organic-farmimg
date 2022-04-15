import React, { useState, useEffect } from "react";
import PrebookItem from "./PrebookItem";

export default function AllPrebookItems({ allCrops }) {
  const [searchKey, setSearchKey] = useState("");
  const [displayProduct, setDisplayProduct] = useState(allCrops);

  useEffect(() => {
    const filtredProduct = allCrops.filter((product) => {
      if (searchKey == "") {
        return product;
      } else if (product.name.toLowerCase().includes(searchKey.toLowerCase())) {
        return product;
      }
    });
    setDisplayProduct(filtredProduct);
  }, [searchKey]);
  return (
    <div className="container">
      <div className="container py-2 ">
        <div className="d-flex justify-content-end mb-4">
          <input
            className="form-control me-2"
            type="search"
            placeholder="Search Organic Foods..."
            id="searchKey"
            aria-label="Search"
            onChange={(e) => {
              setSearchKey(e.target.value);
            }}
          />
        </div>
      </div>

      {displayProduct.length ? (
        <div className="row row-cols-1 row-cols-md-4 g-4">
          {displayProduct.map((crop) => (
            <div key={crop._id} className="col">
              <PrebookItem crop={crop} />
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center h5">No Product Available...</p>
      )}
    </div>
  );
}

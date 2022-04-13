import React, { useState, useEffect, useRef } from "react";
import { getDate } from "bangla-calendar";
import WeaterUpdate from "./WeatherUpdate";
import Cropsuggestion from "./Cropsuggestion";

export default function Weather({ locationData }) {
  const [isOptionChanged, setIsOptionChanged] = useState(false);
  const [location, setLocation] = useState("Tejgaon Ind. Area, Dhaka, Dhaka");
  const divisionRef = useRef("");
  const districtRef = useRef("");
  const upazilaRef = useRef("");
  const unionRef = useRef("");
  const [selectedDivision, setSelectedDivision] = useState();
  const [selectedDistrict, setSelectedDistrict] = useState();
  const [selectedUpazilas, setSelectedUpazilas] = useState();
  const [selectedUnions, setSelectedUnions] = useState();
  const [divisionID, setDivisionID] = useState(96);
  const [latitude, setLatitude] = useState(23.7752);
  const [longitude, setLongitude] = useState(90.3982);

  useEffect(() => {
    if (selectedUnions != unionRef.current.value) {
      setIsOptionChanged(false);
    } else if (!Boolean(selectedUnions)) {
      setIsOptionChanged(false);
    } else {
      setIsOptionChanged(true);
    }
  }, [unionRef.current.value]);

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  // english date
  const current = new Date();
  const date = `${
    monthNames[current.getMonth()]
  } ${current.getDate()}, ${current.getFullYear()}`;

  //   bangla date
  const banglaDate = new Date(date);

  const handleDivisionChange = (e) => {
    if (
      selectedDivision !== divisionRef.current.value ||
      selectedDivision === ""
    ) {
      districtRef.current.value = "";
      upazilaRef.current.value = "";
      unionRef.current.value = "";
    }

    setSelectedDivision(divisionRef.current.value);
    setSelectedDistrict();
    setSelectedUpazilas();
  };

  const handleDistrictChange = (e) => {
    if (
      selectedDistrict !== districtRef.current.value ||
      selectedDistrict === ""
    ) {
      upazilaRef.current.value = "";
      unionRef.current.value = "";
    }
    setSelectedDistrict(districtRef.current.value);
  };
  const handleUpazilasChange = (e) => {
    if (
      selectedUpazilas !== upazilaRef.current.value ||
      selectedUpazilas === ""
    ) {
      unionRef.current.value = "";
    }
    setSelectedUpazilas(upazilaRef.current.value);
  };

  const handleUnionsChange = (e) => {
    if (unionRef.current.valueOf !== "") {
      setSelectedUnions(Number(e.target.value));
    }
  };

  const getPosition = () => {
    setLatitude(
      locationData.unions.find((union) => union.id == unionRef.current.value)
        .latitude
    );
    setLongitude(
      locationData.unions.find((union) => union.id == unionRef.current.value)
        .longitude
    );

    setLocation(`
    ${
      locationData.upazilas.find((upazila) => upazila.id == selectedUpazilas)
        .name
    }
   , 
  ${
    locationData.districts.find((district) => district.id == selectedDistrict)
      .name
  }
  , 
  ${
    locationData.divisions.find((division) => division.id == selectedDivision)
      .name
  }
  `);

    setDivisionID(selectedDivision);
  };
  return (
    <div className="container my-4">
      <div className="row justify-content-center align-items-center">
        <div className="col-lg-6 border">
          <div className="row m-3 border-bottom">
            <div className="col-8">
              <div className="row align-items-center justify-content-center align-items-center">
                <div className="col-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="45"
                    height="45"
                    fill="currentColor"
                    className="bi bi-brightness-high"
                    viewBox="0 0 16 16"
                  >
                    <path d="M8 11a3 3 0 1 1 0-6 3 3 0 0 1 0 6zm0 1a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM8 0a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 0zm0 13a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 13zm8-5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2a.5.5 0 0 1 .5.5zM3 8a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2A.5.5 0 0 1 3 8zm10.657-5.657a.5.5 0 0 1 0 .707l-1.414 1.415a.5.5 0 1 1-.707-.708l1.414-1.414a.5.5 0 0 1 .707 0zm-9.193 9.193a.5.5 0 0 1 0 .707L3.05 13.657a.5.5 0 0 1-.707-.707l1.414-1.414a.5.5 0 0 1 .707 0zm9.193 2.121a.5.5 0 0 1-.707 0l-1.414-1.414a.5.5 0 0 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .707zM4.464 4.465a.5.5 0 0 1-.707 0L2.343 3.05a.5.5 0 1 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .708z" />
                  </svg>
                </div>
                <div className="col-9">
                  <p className="h5">{location}</p>
                </div>
              </div>
            </div>
            <div className="col-4 border-start text-center">
              <a
                className="myLink"
                href="#"
                data-bs-toggle="modal"
                data-bs-target="#exampleModal"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="30"
                  height="30"
                  fill="currentColor"
                  className="bi bi-geo-alt"
                  viewBox="0 0 16 16"
                >
                  <path d="M12.166 8.94c-.524 1.062-1.234 2.12-1.96 3.07A31.493 31.493 0 0 1 8 14.58a31.481 31.481 0 0 1-2.206-2.57c-.726-.95-1.436-2.008-1.96-3.07C3.304 7.867 3 6.862 3 6a5 5 0 0 1 10 0c0 .862-.305 1.867-.834 2.94zM8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10z" />
                  <path d="M8 8a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm0 1a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
                </svg>
                <p className="mb-3 fw-bold h6">Change Location Now</p>
              </a>
            </div>
          </div>
          <p className="m-3 text-center lead fw-normal">
            {getDate(banglaDate)} / {date}
          </p>

          <WeaterUpdate latitude={latitude} longitude={longitude} />
        </div>

        <Cropsuggestion
          divisionID={divisionID}
          monthNames={monthNames[current.getMonth()]}
          locationData={locationData}
        />
      </div>

      {/* modal  */}

      <div
        className="modal fade "
        id="exampleModal"
        tabindex="-1"
        aria-labelledby="setLocation"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="setLocation">
                Set your location
              </h5>
            </div>
            <div className="modal-body">
              <form>
                <div className="my-2">
                  <select
                    id="divisionField"
                    className="form-select"
                    defaultValue={divisionRef}
                    onChange={handleDivisionChange}
                    ref={divisionRef}
                  >
                    <option value="">Choose Your Division...</option>
                    {locationData.divisions.map((e, index) => {
                      return (
                        <option key={index} value={e.id}>
                          {e.name}
                        </option>
                      );
                    })}
                  </select>
                </div>
                <div className="my-2">
                  <select
                    id="districtField"
                    className="form-select"
                    defaultValue={districtRef}
                    ref={districtRef}
                    onChange={handleDistrictChange}
                  >
                    <option value="">Choose Your District ...</option>
                    {locationData.districts.map((e, index) => {
                      if (e.division_id == selectedDivision) {
                        return (
                          <option key={index} value={e.id}>
                            {e.name}
                          </option>
                        );
                      }
                    })}
                  </select>
                </div>

                <div className="my-2">
                  <select
                    id="upazilaField"
                    className="form-select"
                    ref={upazilaRef}
                    defaultValue={upazilaRef}
                    onChange={handleUpazilasChange}
                  >
                    <option value="">Choose Your Upazila ...</option>
                    {locationData.upazilas.map((e, index) => {
                      if (e.district_id == selectedDistrict) {
                        return (
                          <option key={index} value={e.id}>
                            {e.name}
                          </option>
                        );
                      }
                    })}
                  </select>
                </div>

                <div className="my-2">
                  <select
                    id="unionField"
                    className="form-select"
                    defaultValue={unionRef}
                    ref={unionRef}
                    onChange={handleUnionsChange}
                  >
                    <option value="">Choose Your Union ...</option>
                    {locationData.unions.map((e, index) => {
                      if (e.upazila_id == selectedUpazilas) {
                        return (
                          <option key={index} value={e.id}>
                            {e.name}
                          </option>
                        );
                      }
                    })}
                  </select>
                </div>
              </form>
            </div>
            <div className="modal-footer">
              {isOptionChanged ? (
                <button
                  type="button"
                  data-bs-dismiss="modal"
                  className="list-btn w-100 h5 py-3"
                  onClick={getPosition}
                >
                  Save changes
                </button>
              ) : (
                <button
                  type="button"
                  data-bs-dismiss="modal"
                  className="btn btn-secondary btn-lg w-100 h5 py-3"
                  disabled
                >
                  Save changes
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

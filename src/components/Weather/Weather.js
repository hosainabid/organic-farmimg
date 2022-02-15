import React, { useEffect, useState } from "react";
import { getDate } from "bangla-calendar";
import WeaterUpdate from "./WeaterUpdate/WeaterUpdate";
import axios from "axios";

export default function Weather() {
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
  const makeDateForBanglaDate = `${
    monthNames[current.getMonth()]
  } ${current.getDate()} ${current.getFullYear()} ${current.getHours()}:${current.getMinutes()}:${current.getSeconds()}`;

  const date1 = new Date(makeDateForBanglaDate);

  const [location, setLocation] = useState({});
  const [selectedDivision, setSelectedDivision] = useState([]);
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedUpazilas, setSelectedUpazilas] = useState("");
  const [selectedUnions, setSelectedUnions] = useState("");
  const [latitude, setattitude] = useState("0");
  const [longitude, setLongitude] = useState("0");
  const loadingLocation = async () => {
    try {
      const data = await axios
        .get("https://fosholi.com/idss_api//get/locations")
        .then((res) => {
          setLocation(res.data);
          // setSelectedDivision(res.data.divisions);
          // setSelectedDistrict(res.data.districts);
          // setSelectedUpazilas(res.data.upazzzilas);
          // setSelectedUnions(res.data.unions);
        });
    } catch (e) {
      console.log(e);
    }
  };

  console.log(location);

  useEffect(() => {
    loadingLocation();
  }, []);

  const handleDivisionChange = (e) => {
    setSelectedDivision(e.target.value);
  };

  const handleDistrictChange = (e) => {
    setSelectedDistrict(e.target.value);
  };
  const handleUpazilasChange = (e) => {
    setSelectedUpazilas(e.target.value);
  };
  const handleUnionsChange = (e) => {
    setSelectedUnions(e.target.value);
  };

  const getPosition = (unionId) => {
    setattitude(location.data.unions[unionId].latitude);
    setLongitude(location.data.unions[unionId].longitude);
  };

  console.log(latitude);
  console.log(longitude);
  return (
    <div className="container my-4">
      <div className="row justify-content-center align-items-center">
        <div className="col-lg-5 border">
          <div className="row m-3 border-bottom">
            <div className="col-8">
              <div className="row  justify-content-center align-items-center">
                <div className="col-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="40"
                    height="40"
                    fill="currentColor"
                    className="bi bi-brightness-high"
                    viewBox="0 0 16 16"
                  >
                    <path d="M8 11a3 3 0 1 1 0-6 3 3 0 0 1 0 6zm0 1a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM8 0a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 0zm0 13a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 13zm8-5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2a.5.5 0 0 1 .5.5zM3 8a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2A.5.5 0 0 1 3 8zm10.657-5.657a.5.5 0 0 1 0 .707l-1.414 1.415a.5.5 0 1 1-.707-.708l1.414-1.414a.5.5 0 0 1 .707 0zm-9.193 9.193a.5.5 0 0 1 0 .707L3.05 13.657a.5.5 0 0 1-.707-.707l1.414-1.414a.5.5 0 0 1 .707 0zm9.193 2.121a.5.5 0 0 1-.707 0l-1.414-1.414a.5.5 0 0 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .707zM4.464 4.465a.5.5 0 0 1-.707 0L2.343 3.05a.5.5 0 1 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .708z" />
                  </svg>
                </div>
                <div className="col-9">
                  <p>{location.data ? `` : `choose your location first`}</p>
                </div>
              </div>
            </div>
            <div className="col-4 border-start text-center">
              <a href="#" data-bs-toggle="modal" data-bs-target="#exampleModal">
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
                <p>change location now</p>
              </a>
            </div>
          </div>
          <p className="m-3 text-center lead fw-normal">
            {getDate(date1)} / {date}
          </p>

          {/* weater update area  */}

          <WeaterUpdate />
        </div>
      </div>

      {/* modal  */}

      <div
        className="modal fade "
        id="exampleModal"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Set your location
              </h5>
            </div>
            <div className="modal-body">
              <form>
                <div className="my-2">
                  <select
                    onChange={handleDivisionChange}
                    id="divisionField"
                    className="form-select"
                    defaultValue={"DEFAULT"}
                  >
                    <option value="DEFAULT" disabled>
                      Choose Your Division ...
                    </option>
                    {location.data &&
                      location.data.divisions.map((e) => {
                        return <option value={e.id}>{e.name}</option>;
                      })}
                  </select>
                </div>
                <div className="my-2">
                  <select
                    onChange={handleDistrictChange}
                    id="divisionField"
                    className="form-select"
                    defaultValue={"DEFAULT"}
                  >
                    <option value="DEFAULT" disabled>
                      Choose Your District ...
                    </option>
                    {location.data &&
                      location.data.districts.map((e) => {
                        if (e.division_id == selectedDivision) {
                          return <option value={e.id}>{e.name}</option>;
                        }
                      })}
                  </select>
                </div>

                <div className="my-2">
                  <select
                    onChange={handleUpazilasChange}
                    id="divisionField"
                    className="form-select"
                    defaultValue={"DEFAULT"}
                  >
                    <option value="DEFAULT" disabled>
                      Choose Your Upazila ...
                    </option>
                    {location.data &&
                      location.data.upazilas.map((e) => {
                        if (e.district_id == selectedDistrict) {
                          return <option value={e.id}>{e.name}</option>;
                        }
                      })}
                  </select>
                </div>

                <div className="my-2">
                  <select
                    onChange={handleUnionsChange}
                    id="divisionField"
                    className="form-select"
                    defaultValue={"DEFAULT"}
                  >
                    <option value="DEFAULT" disabled>
                      Choose Your Union ...
                    </option>
                    {location.data &&
                      location.data.unions.map((e) => {
                        if (e.upazila_id == selectedUpazilas) {
                          return <option value={e.id}>{e.name}</option>;
                        }
                      })}
                  </select>
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                data-bs-dismiss="modal"
                className="btn btn-primary"
                onClick={() => getPosition(selectedUnions)}
              >
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

import React, { useEffect, useState } from "react";
import axios from "axios";

export default function WeaterUpdate({ latitude, longitude }) {
  const apiKey = `6e9b7bb144c2cc30713fed88f46a66cc`;
  const [weatherUpdate, setWeatherUpdate] = useState();

  const loadingWeatherUpdate = async () => {
    const url = `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}`;
    try {
      const data = await axios.get(url).then((res) => {
        setWeatherUpdate(res.data);
      });
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    loadingWeatherUpdate();
  }, [latitude, longitude]);
  const fToC = (temp) => {
    const tempInC = Number(temp) - 273.15;
    return `${Math.round(tempInC)}`;
  };

  return (
    <div className="row m-3 justify-content-center align-items-center">
      <div className="col-3 border-end">
        <p>Now</p>
        <p>
          {Boolean(weatherUpdate) && fToC(weatherUpdate.main.temp)}
          <span>&#176;</span>
        </p>
      </div>
      <div className="col-3 border-end">
        <p>Max</p>
        <p>
          {Boolean(weatherUpdate) && fToC(weatherUpdate.main.temp_max)}
          <span>&#176;</span>
        </p>
      </div>
      <div className="col-3">
        <p>Humidity</p>
        <p>{Boolean(weatherUpdate) && weatherUpdate.main.humidity}%</p>
      </div>
    </div>
  );
}

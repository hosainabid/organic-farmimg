import React, { useEffect } from "react";
import axios from "axios";

export default function WeaterUpdate({ latitude, longitude }) {
  const apiKey = `6e9b7bb144c2cc30713fed88f46a66cc`;

  const loadingWeatherUpdate = async () => {
    const url = `api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}`;
    try {
      const data = await axios.get(url).then((res) => {
        console.log(res.data);
      });
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    loadingWeatherUpdate();
  }, []);

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

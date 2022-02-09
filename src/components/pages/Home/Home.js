import React from "react";
import Weather from "../../Weather/Weather";
import Header from "../../Header/Header";

export default function Home() {
  return (
    <div>
      <Header />
      <Weather></Weather>
    </div>
  );
}

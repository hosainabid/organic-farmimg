import React from "react";

export default function Option(props) {
  console.log(props);
  return <option value={props.name}>{props.name}</option>;
}

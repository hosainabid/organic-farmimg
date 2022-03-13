import React from "react";

const TableRow = ({ seedDetails }) => {
  console.log(seedDetails);
  return (
    <tr>
      <th scope="row">2</th>
      <td>Jacob</td>
      <td>Thornton</td>
      <td>@fat</td>
    </tr>
  );
};

export default TableRow;

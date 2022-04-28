import React from "react";

export default function OrderCommissionTableItem({ order, totalAmount }) {
  const { buyerName, date, total, status, _id, buyerEmail, productDetails, buyerAddress, buyerMobile } = order;
  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  console.log({order})

  let month;
  let day;
  let year;
  if (date) {
    month = months[(new Date(date))?.getMonth()];
    day = (new Date(date))?.getDate();
    year = (new Date(date))?.getFullYear();
  }
  return (
    <tr className="bg-white p-3">
      <td className="">{buyerName}</td>
      <td className="text-center">{`${month || 'April'} ${day || '22'}, ${year || '2022'}`}</td>
      <td>
        <span style={{marginRight: '5px'}} className="text-capitalize">{status}</span>
      </td>
      <td>
        <button
          type="button"
          className="btn"
          data-bs-toggle="modal"
          data-bs-target={`#productDetails${_id ? _id : ''}`}
          style={{backgroundColor: '#94d321'}}
        >
          See Details
        </button>
        <div className="modal fade" id={`productDetails${_id ? _id : ''}`} tabIndex="-1" aria-labelledby={`productDetailsLabel${_id ? _id : ''}`} aria-hidden="true">
          <div className="modal-dialog modal-xl modal-dialog-centered modal-dialog-scrollable">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id={`productDetailsLabel${_id ? _id : ''}`}>Order Details</h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div className="modal-body">
                <div className="container">
                  <div className="row">
                    <div className="col-4">Buyer Name</div>
                    <div className="col-1 text-center">:</div>
                    <div className="col-7">{buyerName}</div>
                  </div>
                  <div className="row">
                    <div className="col-4">Buyer Email</div>
                    <div className="col-1 text-center">:</div>
                    <div className="col-7">{buyerEmail}</div>
                  </div>
                  <div className="row">
                    <div className="col-4">Buyer Address</div>
                    <div className="col-1 text-center">:</div>
                    <div className="col-7">{buyerAddress}</div>
                  </div>
                  <div className="row">
                    <div className="col-4">Buyer Mobile</div>
                    <div className="col-1 text-center">:</div>
                    <div className="col-7">{buyerMobile}</div>
                  </div>
                  <div className="row">
                    <div className="col-4">Placed On</div>
                    <div className="col-1 text-center">:</div>
                    <div className="col-7">{`${month || 'April'} ${day || '22'}, ${year || '2022'}`}</div>
                  </div>
                  <div className="row">
                    <div className="col-4">Total Paid by User</div>
                    <div className="col-1 text-center">:</div>
                    <div className="col-7">{(total * 1 || 0).toFixed(2)} TK</div>
                  </div>
                  <div className="row">
                    <div className="col-4">Total Earnings (Farmer)</div>
                    <div className="col-1 text-center">:</div>
                    <div className="col-7">{((total || 0) - ((total || 0) * .1)).toFixed(2)} TK</div>
                  </div>
                  <div className="row">
                    <div className="col-4">Total Commission</div>
                    <div className="col-1 text-center">:</div>
                    <div className="col-7">{((total || 0) * .1).toFixed(2)} TK</div>
                  </div>
                  <div className="row">
                    <div className="col-4">Status</div>
                    <div className="col-1 text-center">:</div>
                    <div className="col-7 text-capitalize">{status} by farmer</div>
                  </div>
                </div>
                <div className="table-responsive mt-3">
                  <table className="table table-hover">
                    <thead style={{textAlign: 'center'}}>
                      <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Product Name</th>
                        <th scope="col">Price</th>
                        <th scope="col">Quantity</th>
                        <th scope="col">Category</th>
                        <th scope="col">Farmer</th>
                        <th scope="col">Type</th>
                        <th scope="col">Total Price</th>
                      </tr>
                    </thead>
                    {
                      productDetails?.map((product) => {
                        return (
                          <tbody style={{position: 'relative', textAlign: 'center'}}>
                            <td>{product.productId}</td>
                            <td>{product.productName}</td>
                            <td>{(product.productPrice * 1 || 0).toFixed(2)} TK</td>
                            <td>{product.productQuantity}</td>
                            <td>{product.productCategory}</td>
                            <td>{product.farmerName}</td>
                            <td>{product.type}</td>
                            <td>{((product.productPrice || 0) * (product.productQuantity || 0)).toFixed(2)} TK</td>
                          </tbody>
                        );
                      })
                    }
                  </table>
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              </div>
            </div>
          </div>
        </div>
      </td>
      <td>
        <p className="text-end">{(total * 1 || 0).toFixed(2)} Tk</p>
      </td>
      <td>
        <p className="text-end">{((total || 0) * .1).toFixed(2)} TK</p>
      </td>
    </tr>
  );
}

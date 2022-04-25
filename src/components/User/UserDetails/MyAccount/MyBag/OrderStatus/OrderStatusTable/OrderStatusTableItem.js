import axios from "axios";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import rootAPI from '../../../../../../../configurables';

export default function OrderStatusTableItem({ order, isSuccess, setIsSuccess, isMyOrder }) {
  const [canceled, setCanceled] = useState(false);
  const [reason, setReason] = useState('');
  const { buyerId, buyerName, date, total, status, _id, buyerEmail } = order;
  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  const history = useHistory();

  let month;
  let day;
  let year;
  if (date) {
    month = months[(new Date(date))?.getMonth()];
    day = (new Date(date))?.getDate();
    year = (new Date(date))?.getFullYear();
  }

  const onPressHandler = async () => {
    await axios
      .post(`${rootAPI}/order_status_update`, {
        id: _id,
        status: "shipped",
        cancel_reason: "",
      })
      .then((res) => {
        console.log(res);
        if (res.data.isSuccess) {
          setIsSuccess(true);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  useEffect(() => {
    if (isSuccess) {
      history.push("/myAccount/myBag/shipped");
    }
  }, [isSuccess]);

  const onConfirm = async (id) => {
    console.log({id})
    await axios
      .post(`${rootAPI}/order_status_update`, {
        id,
        status: "paid",
        cancel_reason: "",
      })
      .then((res) => {
        console.log(res);
        if (res.data.isSuccess) {
          window.location.reload();
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }
  const onCancel = async (id) => {
    console.log({id})
    await axios
      .post(`${rootAPI}/order_status_update`, {
        id,
        status: "canceled",
        cancel_reason: `${reason}`,
      })
      .then((res) => {
        console.log(res);
        if (res.data.isSuccess) {
          window.location.reload();
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }
  return (
    <>
      <tr className="bg-white p-3">
        <th scope="row">{_id}</th>
        <td className="">{buyerName}</td>
        <td>{`${month || 'April'} ${day || '22'}, ${year || '2022'}`}</td>
        <td>{total || 0} Tk</td>
        <td>
          <span style={{marginRight: '5px'}} className="text-capitalize">{status === 'paid' ? 'Confirmed' : status}</span>
          {
            status === 'pending' && !isMyOrder && (
              <button
                className="btn"
                style={{
                  padding: '5px 30px',
                  backgroundColor: '#94d321'
                }}
                onClick={onPressHandler}
              >
                Ship
              </button>
            )
          }
          {
            status === 'shipped' && isMyOrder && (
              <button
                type="button"
                className="btn"
                data-bs-toggle="modal"
                data-bs-target={`#exampleModal${_id ? _id : ''}`}
                style={{backgroundColor: '#94d321'}}
              >
                Take Action
              </button>
            )
          }
          <div className="modal fade" id={`exampleModal${_id ? _id : ''}`} tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id={`exampleModalLabel${_id ? _id : ''}`}>Take an action</h5>
                  <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body">
                  {
                    !canceled ? (
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
                          <div className="col-4">Placed On</div>
                          <div className="col-1 text-center">:</div>
                          <div className="col-7">{`${month || 'April'} ${day || '22'}, ${year || '2022'}`}</div>
                        </div>
                        <div className="row">
                          <div className="col-4">Total Amount</div>
                          <div className="col-1 text-center">:</div>
                          <div className="col-7">{total} TK</div>
                        </div>
                        <div className="row">
                          <div className="col-4">Status</div>
                          <div className="col-1 text-center">:</div>
                          <div className="col-7 text-capitalize">{status === 'paid' ? 'Confirmed' : status}</div>
                        </div>
                      </div>
                    ) : (
                      <div className="mb-3">
                        <label htmlFor="exampleFormControlTextarea1" className="form-label">Why you want to cancel this order?</label>
                        <textarea className="form-control" id="exampleFormControlTextarea1" rows="3" onBlur={(r) => setReason(r.target.value)}></textarea>
                      </div>
                    )
                  }
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                  {
                    canceled && (
                      <button type="button" className="btn btn-danger" onClick={() => onCancel(_id)} data-bs-dismiss="modal">Cancel</button>
                    )
                  }
                  {
                    !canceled && (
                      <>
                        <button type="button" className="btn btn-danger" onClick={() => setCanceled(true)}>Cancel</button>
                        <button type="button" className="btn" style={{backgroundColor: '#94d321'}} onClick={() => onConfirm(_id)} data-bs-dismiss="modal">Confirm</button>
                      </>
                    )
                  }
                </div>
              </div>
            </div>
          </div>
        </td>
      </tr>
    </>
  );
}

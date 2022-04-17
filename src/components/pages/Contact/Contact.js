import React from "react";
import Header from "../../Header/Header";
import emailjs from "@emailjs/browser";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Contact() {
  const sendEmail = (e) => {
    e.preventDefault();
    toast.info("Sending Email", {
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    emailjs
      .sendForm(
        "service_oyt98e6",
        "template_ybmarwn",
        e.target,
        "user_hmIREK9ludGXDGkxuQimc"
      )
      .then(
        (result) => {
          console.log(result.text);
          toast.success(result.text, {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        },
        (error) => {
          console.log(error.text);
          toast.error(error.text, {
            position: "top-center",
            autoClose: 4000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        }
      );
    e.target.reset();
  };
  return (
    <div>
      <Header />
      <ToastContainer />
      <div className="container my-4">
        <div className="row justify-content-center align-items-center">
          <div className="col-md-7 col-sm-10 col-xs-12 border m-3">
            <h3 className="text-center py-2 border-bottom mb-3">Contact Us</h3>
            <form className="my-3" onSubmit={sendEmail}>
              <div className="mb-3">
                <label
                  htmlFor="formGroupExampleInput"
                  className="form-label my-3 h5 text-secondary"
                >
                  Your name
                </label>
                <input
                  required
                  type="text"
                  name="commenterName"
                  className="form-control"
                  placeholder="Enter Your Name..."
                />
              </div>
              <div className="mb-3">
                <label
                  htmlFor="formGroupExampleInput"
                  className="form-label my-3 h5 text-secondary"
                >
                  Your Email
                </label>
                <input
                  required
                  type="email"
                  name="commenterEmail"
                  className="form-control"
                  placeholder="Enter Your Email..."
                />
              </div>

              <div className="mb-3">
                <label
                  htmlFor="formGroupExampleInput"
                  className="form-label my-3 h5 text-secondary"
                >
                  Subject
                </label>
                <input
                  required
                  type="text"
                  name="commentSubject"
                  className="form-control"
                  placeholder="Enter Your Subject..."
                />
              </div>

              <div className="my-3">
                <label
                  htmlFor="formGroupExampleInput"
                  className="form-label my-3 h5 text-secondary"
                >
                  Your Comment
                </label>
                <textarea
                  className="form-control"
                  name="message"
                  placeholder="Leave Your Comment Here..."
                ></textarea>
              </div>

              <div className="col-12">
                <button type="submit" className="myBtn w-100 h4 py-2">
                  Send
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

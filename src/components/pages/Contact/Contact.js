import React from "react";
import Header from "../../Header/Header";

export default function Contact() {
  return (
    <div>
      <Header />
      <div className="container my-4">
        <div className="row justify-content-center align-items-center">
          <div className="col-md-7 col-sm-10 col-xs-12 border m-3">
            <h3 className="text-center py-2 border-bottom mb-3">Contact Us</h3>
            <form className="my-3">
              <div className="mb-3">
                <label htmlFor="formGroupExampleInput" className="form-label">
                  Your name
                </label>
                <input
                  required
                  type="text"
                  className="form-control"
                  placeholder="Enter Your Name..."
                />
              </div>
              <div className="mb-3">
                <label htmlFor="formGroupExampleInput" className="form-label">
                  Your Email
                </label>
                <input
                  required
                  type="email"
                  className="form-control"
                  placeholder="Enter Your Email..."
                />
              </div>
              <div className="mb-3">
                <label htmlFor="formGroupExampleInput2" className="form-label">
                  Subject
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="formGroupExampleInput2"
                  placeholder="What is the topic???"
                />
              </div>
              <div className="mb-3">
                <textarea
                  class="form-control"
                  placeholder="Leave Your Comment Here..."
                ></textarea>
              </div>

              <div className="col-12">
                <button type="submit" className="btn btn-primary w-100">
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

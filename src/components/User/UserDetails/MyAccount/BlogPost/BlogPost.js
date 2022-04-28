import axios from "axios";
import React, { useState, Fragment } from "react";
import { NavLink } from "react-router-dom";
import useAuth from "../../../../../hooks/useAuth";
import rootAPI from "../../../../../configurables";
import { toast, ToastContainer } from "react-toastify";

const BlogPost = () => {
  const [postTitle, setPostTitle] = useState("");
  const [postContent, setPostContent] = useState("");
  const [postImage, setPostImage] = useState(null);
  const [isRequestingAPI, setIsRequestingAPI] = useState(false);

  const { user } = useAuth();

  const forumPostHandler = (event) => {
    event.preventDefault();
    setIsRequestingAPI(true);

    const d = new Date();
    const postTime = `${d.toLocaleString("default", {
      month: "short",
    })}'${d.getDate()} ${d.getFullYear()}`;

    const formData = new FormData();
    formData.append("publisherName", user.name);
    formData.append("publisherRole", user.role);
    formData.append("publisherID", user._id);
    formData.append("title", postTitle);
    formData.append("postContent", postContent);
    formData.append("postTime", postTime);
    formData.append("file", postImage);
    formData.append("commments", [null]);

    axios
      .post(`${rootAPI}/post_blog`, formData)
      .then((res) => {
        toast.success('Blog post created successfully!', {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      })
      .catch((error) => {
        console.log(error);
        toast.error('Something went wrong!', {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      })
      .finally(() => {
        setIsRequestingAPI(false);
        setPostTitle("");
        setPostContent("");
        setPostImage(null);
      });
  };

  return (
    <Fragment>
      <ToastContainer />
      <div className="my-2 d-flex justify-content-end">
        <NavLink
          to="/myAccount/blogPost/previousBlogPosts"
          className="myBtn py-2 px-3 fw-bold"
          aria-current="page"
        >
          Previous Blog Posts
        </NavLink>
      </div>
      <h3 className="text-center my-4">Upload A Blog Post</h3>

      <div className="row justify-content-center">
        <div className="col-lg-10">
          <form onSubmit={forumPostHandler}>
            <div className="mb-3">
              <input
                required
                type="text"
                className="form-control"
                placeholder="Blog Title"
                value={postTitle}
                onChange={(e) => setPostTitle(e.target.value)}
              />
            </div>

            <div className="mb-3">
              <textarea
                required
                className="form-control"
                placeholder="What's on your blog..."
                rows="4"
                value={postContent}
                onChange={(e) => setPostContent(e.target.value)}
              ></textarea>
            </div>

            <div className="mb-3">
              <input
                required
                onChange={(e) => setPostImage(e.target.files[0])}
                type="file"
                className="form-control"
              />
            </div>

            <div className="form-group mt-4">
              {isRequestingAPI ? (
                <button
                  type="submit"
                  className="btn btn-secondary px-4 py-2 text-white"
                  disabled
                >
                  Posting on Blog...
                </button>
              ) : (
                <button type="submit" className="list-btn px-4 py-2 text-white">
                  Post on Blog
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default BlogPost;

import axios from "axios";
import React, { useState } from "react";
import useAuth from "../../../../../hooks/useAuth";

const ForumPost = () => {
  const [postTitle, setPostTitle] = useState("");
  const [postContent, setPostContent] = useState("");
  const [postImage, setPostImage] = useState(null);

  const { user } = useAuth();

  const forumPostHandler = (event) => {
    event.preventDefault();
    const d = new Date();
    const postTime = `${d.toLocaleString("default", {
      month: "short",
    })}'${d.getDate()} ${d.getFullYear()}`;

    const formData = new FormData();
    formData.append("publisherName", user.name);
    formData.append("publisherRole", user.role);
    formData.append("title", postTitle);
    formData.append("postContent", postContent);
    formData.append("postTime", postTime);
    formData.append("file", postImage);
    formData.append("commments", JSON.stringify([]));

    axios
      .post("https://shrouded-basin-02702.herokuapp.com/post_forum", formData)
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div>
      <h3 className="text-center my-4">Upload A Forum Post</h3>

      <div className="row justify-content-center">
        <div className="col-lg-10">
          <form onSubmit={forumPostHandler}>
            <div className="mb-3">
              <input
                required
                type="text"
                className="form-control"
                placeholder="Forum Title"
                onChange={(e) => setPostTitle(e.target.value)}
              />
            </div>

            <div className="mb-3">
              <textarea
                required
                className="form-control"
                placeholder="What's on your query..."
                rows="4"
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
              <button type="submit" className="list-btn px-4 py-2 text-white">
                Post on Forum
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ForumPost;

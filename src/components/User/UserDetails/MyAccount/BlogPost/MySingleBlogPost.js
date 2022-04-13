import axios from "axios";
import React, { useState, useRef } from "react";
import rootAPT from "../../../../../configurables";

export default function MySingleBlogPost({ post, setApiRecall }) {
  const [apiLoading, setApiLoading] = useState(false);
  const [newPostTitle, setNewPostTitle] = useState(post.title);
  const [newPostContent, setNewPostContent] = useState(post.postContent);

  const deletePostHandler = (id) => {
    axios
      .post(`${rootAPT}/delete_blog_post`, {
        id: id,
      })
      .then(function (response) {
        console.log(response);
        setApiLoading(true);
      })
      .catch(function (error) {
        console.log(error);
      })
      .finally(() => {
        setApiLoading(false);
        setApiRecall((prev) => !prev);
      });
  };

  const updatePostHandler = (id) => {
    console.log(post);
    axios
      .post(`${rootAPT}/update_blog_post`, {
        id: id,
        publisherName: post.publisherName,
        publisherRole: post.publisherRole,
        publisherID: post.publisherID,
        postTime: post.postTime,
        comments: post.comments,
        title: newPostTitle.trim(),
        postContent: newPostContent.trim(),
      })
      .then(function (response) {
        console.log(response);
        setApiLoading(true);
      })
      .catch(function (error) {
        console.log(error);
      })
      .finally(() => {
        setApiLoading(false);
        setApiRecall((prev) => !prev);
      });
  };

  return (
    <div className="col-md-10 col-sm-12 col-lg-7 mb-4 border rounded p-4 shadow">
      <div className="form-group">
        <label htmlFor="post-title">Post Title</label>
        <input
          type="text"
          id="post-title"
          className="form-control"
          value={newPostTitle}
          onChange={(e) => {
            setNewPostTitle(e.target.value);
          }}
        />
      </div>
      <div className="forum-post-img d-flex my-4 justify-content-center">
        <img
          className="img-fluid rounded"
          src={`data:image/png;base64,${post.image.img}`}
          alt=""
        />
      </div>
      <div className="form-group">
        <label htmlFor={`textarea-${post._id}`}>Post Content</label>
        <textarea
          className="form-control"
          id={`textarea-${post._id}`}
          rows="5"
          value={newPostContent}
          onChange={(e) => {
            setNewPostContent(e.target.value);
          }}
        ></textarea>
      </div>

      {!apiLoading ? (
        <div className="d-flex justify-content-end mt-4">
          <button
            onClick={() => updatePostHandler(post._id)}
            type="button"
            className="list-btn mx-2 px-1 py-2 text-white h5"
          >
            Update
          </button>
          <button
            onClick={() => deletePostHandler(post._id)}
            type="button"
            className="list-btn mx-2 px-1 py-2 text-white h5"
          >
            Delete
          </button>
        </div>
      ) : (
        <div className="d-flex justify-content-end mt-4">
          <button
            onClick={() => updatePostHandler(post._id)}
            type="button"
            className="list-btn mx-2 px-1 py-2 text-white h5"
            disabled
          >
            Update
          </button>
          <button
            onClick={() => deletePostHandler(post._id)}
            type="button"
            className="list-btn mx-2 px-1 py-2 text-white h5"
            disabled
          >
            Delete
          </button>
        </div>
      )}
    </div>
  );
}

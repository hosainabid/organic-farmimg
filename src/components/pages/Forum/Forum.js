import axios from "axios";
import React, { useState, useEffect } from "react";
import Header from "../../Header/Header";
import LoadingSpinner from "../../utilities/LoadingSpinner/LoadingSpinner";
import rootAPI from "../../../configurables";

import "./Forum.css";
import SingleForumPost from "./SingleForumPost";

export default function Forum() {
  const [apiRecall, setApiRecall] = useState(false);
  const [isSeedLoaded, setIsSeedLoaded] = useState(false);
  const [allForumPost, setAllForumPost] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [isCommentPosting, setIsCommentPosting] = useState(false);

  const loadAllForumPost = async () => {
    try {
      const data = await axios
        .get(`${rootAPI}/all_forum_posts_with_comments`)
        .then((res) => {
          setAllForumPost(res.data.reverse());
          setIsSeedLoaded(true);
        });
    } catch (e) {
      console.log(e);
    }
  };

  React.useEffect(() => {
    loadAllForumPost();
  }, [apiRecall]);

  const onCommentSubmit = (event, postId, name, allComment) => {
    event.preventDefault();
    setIsCommentPosting(true);

    const d = new Date();
    const commentTime = `${d.toLocaleString("default", {
      month: "short",
    })}'${d.getDate()} ${d.getFullYear()}`;
    event.preventDefault();
    const commnetString = newComment.trim();
    if (/^[a-zA-Z ]+$/.test(commnetString)) {
      const formData = new FormData();
      formData.append("id", postId);
      formData.append(
        "commments",
        JSON.stringify([
          ...allComment,
          {
            commenterName: name,
            commentString: commnetString,
            commentTime: commentTime,
          },
        ])
      );

      axios
        .post(`${rootAPI}/add_comment_to_forum_post`, formData)
        .then((res) => {
          console.log(res);
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          setIsCommentPosting(false);
          setNewComment("");
          setApiRecall((prevState) => !prevState);
        });
    }
  };

  let forumContent = allForumPost.length ? (
    allForumPost.map((postDetails) => (
      <SingleForumPost
        key={postDetails._id}
        postDetails={postDetails}
        onNewCommnet={setNewComment}
        commentValue={newComment}
        isCommentPosting={isCommentPosting}
        onCommentSubmit={onCommentSubmit}
      />
    ))
  ) : (
    <p className="h5 text-center">There is no forum post</p>
  );

  return (
    <div>
      <Header />
      <div className="container forum">
        <h3 className="text-center my-4">Forum</h3>
        {isSeedLoaded ? forumContent : <LoadingSpinner />}
      </div>
    </div>
  );
}

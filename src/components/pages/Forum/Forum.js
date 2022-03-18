import axios from "axios";
import React from "react";
import Header from "../../Header/Header";
import LoadingSpinner from "../../utilities/LoadingSpinner/LoadingSpinner";

import "./Forum.css";
import SingleForumPost from "./SingleForumPost";

export default function Forum() {
  const [apiRecall, setApiRecall] = React.useState(false);
  const [isSeedLoaded, setIsSeedLoaded] = React.useState(false);
  const [allForumPost, setAllForumPost] = React.useState([]);
  const [newComment, setNewComment] = React.useState("");

  const loadAllForumPost = async () => {
    try {
      const data = await axios
        .get(
          "https://shrouded-basin-02702.herokuapp.com/all_forum_posts_with_comments"
        )
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
        .post(
          "https://shrouded-basin-02702.herokuapp.com/add_comment_to_forum_post",
          formData
        )
        .then((res) => {
          console.log(res);
          setApiRecall((prevState) => !prevState);
        })
        .catch((error) => {
          console.log(error);
        });
    }

    setNewComment("");
  };

  let forumContent = allForumPost.length ? (
    allForumPost.map((postDetails) => (
      <SingleForumPost
        key={postDetails._id}
        postDetails={postDetails}
        onNewCommnet={setNewComment}
        commentValue={newComment}
        onCommentSubmit={onCommentSubmit}
      />
    ))
  ) : (
    <p>There is no forum post</p>
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

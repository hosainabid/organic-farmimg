import axios from "axios";
import React, { useState, useEffect, Fragment } from "react";
import useAuth from "../../../../../hooks/useAuth";
import LoadingSpinner from "../../../../utilities/LoadingSpinner/LoadingSpinner";

export default function PreviousForumPost() {
  const { user } = useAuth();
  const [apiRecall, setApiRecall] = React.useState(false);
  const [isForumLoaded, setIsForumLoaded] = React.useState(false);
  const [allForumPost, setAllForumPost] = React.useState([]);

  const loadAllForumPost = async () => {
    try {
      const data = await axios
        .get(
          "https://shrouded-basin-02702.herokuapp.com/all_forum_posts_with_comments"
        )
        .then((res) => {
          setAllForumPost(res.data.reverse());
          setIsForumLoaded(true);
        });
    } catch (e) {
      console.log(e);
    }
  };

  React.useEffect(() => {
    loadAllForumPost();
  }, [apiRecall]);

  console.log(allForumPost);
  return (
    <Fragment>
      <h3 className="text-center my-4">Update/Delete Your Forum Post</h3>
      <div className="row justify-content-center"></div>

      {isForumLoaded ? <div>loading complete</div> : <LoadingSpinner />}
    </Fragment>
  );
}

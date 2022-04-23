import axios from "axios";
import React, { useState } from "react";
import Header from "../../Header/Header";
import LoadingSpinner from "../../utilities/LoadingSpinner/LoadingSpinner";
import rootAPI from "../../../configurables";

import "./Forum.css";
import SingleForumPost from "./SingleForumPost";

export default function Forum() {
  const [apiRecall, setApiRecall] = useState(false);
  const [isSeedLoaded, setIsSeedLoaded] = useState(false);
  const [allForumPost, setAllForumPost] = useState([]);

  React.useEffect(() => {
    axios.get(`${rootAPI}/all_blog_posts_with_comments`).then((res) => {
      console.log(res);
      setAllForumPost(res.data.reverse());
      setIsSeedLoaded(true);
    });
  }, [apiRecall]);

  console.log(allForumPost);

  let forumContent = allForumPost.length ? (
    allForumPost.map((postDetails) => (
      <SingleForumPost
        key={postDetails._id}
        postDetails={postDetails}
        setApiRecall={setApiRecall}
      />
    ))
  ) : (
    <p className="h5 text-center">There is no forum post</p>
  );

  return (
    <div>
      <Header />

      <div className="container forum my-5">
        {isSeedLoaded ? forumContent : <LoadingSpinner />}
      </div>
    </div>
  );
}

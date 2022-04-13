import axios from "axios";
import React, { useState, useEffect, Fragment } from "react";
import useAuth from "../../../../../hooks/useAuth";
import MySingleBlogPost from "./MySingleBlogPost";

import rootAPI from "../../../../../configurables";
import LoadingSpinner from "../../../../utilities/LoadingSpinner/LoadingSpinner";

export default function PreviousBlogPost() {
  const { user } = useAuth();
  const [apiRecall, setApiRecall] = useState(false);
  const [isForumLoaded, setIsForumLoaded] = useState(false);
  const [allForumPost, setAllForumPost] = useState([]);

  const loadAllForumPost = async () => {
    try {
      const data = await axios
        .get(`${rootAPI}/all_blog_posts_with_comments`)
        .then((res) => {
          setAllForumPost(res.data.reverse());
          setIsForumLoaded(true);
        });
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    loadAllForumPost();
  }, [apiRecall]);
  return (
    <Fragment>
      <h3 className="text-center my-4">Update/Delete Your Blog Post</h3>
      <div className="row justify-content-center"></div>

      {!isForumLoaded && <LoadingSpinner />}
      {Boolean(allForumPost.length) && (
        <div className="row justify-content-center">
          {allForumPost.map((post) => {
            if (post.publisherID === user._id)
              return (
                <MySingleBlogPost
                  setApiRecall={setApiRecall}
                  key={post._id}
                  post={post}
                />
              );
          })}
        </div>
      )}
    </Fragment>
  );
}

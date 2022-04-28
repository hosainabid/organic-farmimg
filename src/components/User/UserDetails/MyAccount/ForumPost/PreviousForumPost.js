import axios from "axios";
import React, { useState, useEffect, Fragment } from "react";
import useAuth from "../../../../../hooks/useAuth";
import LoadingSpinner from "../../../../utilities/LoadingSpinner/LoadingSpinner";
import rootAPI from "../../../../../configurables";
import MySingleForumPost from "./MySingleForumPost";

export default function PreviousForumPost() {
  const { user } = useAuth();
  const [apiRecall, setApiRecall] = useState(false);
  const [isForumLoaded, setIsForumLoaded] = useState(false);
  const [allForumPost, setAllForumPost] = useState([]);

  useEffect(() => {
    axios.get(`${rootAPI}/all_forum_posts_with_comments`).then((res) => {
      setAllForumPost(res.data.reverse());
      setIsForumLoaded(true);
    }).catch(err => {
      console.log(err)
    })
  }, [apiRecall]);

  return (
    <Fragment>
      <h3 className="text-center my-4">Update/Delete Your Forum Post</h3>
      <div className="row justify-content-center"></div>

      {
        allForumPost?.length > 0 ? (
          <div className="row justify-content-center">
            {allForumPost?.map((post) => {
              if (user?.role !== 'user' && (user?.role === 'admin' || post?.publisherID === user?._id))
                return (
                  <MySingleForumPost
                    setApiRecall={setApiRecall}
                    key={post._id}
                    post={post}
                  />
                );
            })}
          </div>
        ) : (<LoadingSpinner />)
      }
    </Fragment>
  );
}

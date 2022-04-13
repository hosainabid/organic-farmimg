import React from "react";
import useAuth from "../../../hooks/useAuth";

const SingleForumPost = ({
  postDetails,
  onNewCommnet,
  commentValue,
  isCommentPosting,
  onCommentSubmit,
}) => {
  const { user } = useAuth();
  let allComment = JSON.parse(postDetails.commments);
  // console.log(allComment);
  return (
    <div className="row justify-content-center mb-5">
      <div className="col-lg-6 forum-post shadow py-3 rounded">
        <div className="d-flex justify-content-between align-items-center">
          <div>
            <h5 className="text-capitalize">{postDetails.title}</h5>
            <p className="text-secondary">
              by{" "}
              <span className="fw-bolder text-capitalize">
                {postDetails.publisherName}
              </span>
              <span className="mx-3">&bull;</span>
              <span className="text-capitalize">
                {postDetails.publisherRole}
              </span>{" "}
              post
            </p>
          </div>
          <div>
            <p className="text-secondary">{postDetails.postTime}</p>
          </div>
        </div>
        <p className="my-3">{postDetails.postContent}</p>
        <div className="forum-post-img d-flex justify-content-center">
          <img
            className="img-fluid rounded"
            src={`data:image/png;base64,${postDetails.image.img}`}
            alt=""
          />
        </div>
        <hr />
        <form
          onSubmit={(event) =>
            onCommentSubmit(event, postDetails._id, user.name, allComment)
          }
        >
          {isCommentPosting ? (
            <p className="text-center h5 my-2 text-secondary">
              Your comment is posting now, please wait...
            </p>
          ) : (
            <div className="d-flex justify-content-center">
              <input
                required
                type="text"
                value={commentValue}
                className="form-control me-2"
                placeholder="Submit your comment here..."
                onChange={(e) => onNewCommnet(e.target.value)}
              />
              <button
                type="submit"
                className="list-btn py-2 px-3"
                style={{ borderRadius: "20px" }}
              >
                Comment
              </button>
            </div>
          )}
        </form>

        {allComment.length ? (
          allComment.map((commentDetails, index) => (
            <div
              className="border my-3 p-2 rounded shadow"
              key={`${postDetails._id}` + index}
            >
              <div className="d-flex justify-content-between px-3 mb-2">
                <p className="h6 text-capitalize">
                  {commentDetails.commenterName}
                </p>
                <p className="text-secondary">{commentDetails.commentTime}</p>
              </div>
              <p className="px-4">{commentDetails.commentString}</p>
            </div>
          ))
        ) : (
          <p className="text-center my-3 p-2">There is no comment</p>
        )}
      </div>
    </div>
  );
};

export default SingleForumPost;

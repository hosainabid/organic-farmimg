import React, { useState, useRef } from "react";
import useAuth from "../../../hooks/useAuth";

export default function SingleForumComment({ commentDetails, submitReply, reply }) {
  const [wantReply, setWantReply] = useState(false);
  const commentReply = useRef("");
  const { user } = useAuth();
  return (
    <div className=" my-4">
      <div
        className="border my-3 p-2 rounded shadow"
        key={commentDetails.commentId}
      >
        <div className="d-flex justify-content-between px-3 mb-2">
          <p className="h6 text-capitalize">{commentDetails.commenterName}</p>
          <p className="text-secondary">{commentDetails.commentTime}</p>
        </div>
        <div className="d-flex justify-content-between align-items-center">
          <i className="px-4 col-10">{commentDetails.commentString}</i>
          {
            reply ? (
              <button
                className="border-0 bg-white text-info col-2 forget-pass"
                onClick={() => setWantReply(true)}
              >
                Reply
              </button>
            ) : ''
          }
        </div>
        <details>
          <summary>View replies</summary>
          {
            commentDetails.replies.map((rply, index) => <div className="border my-3 p-2 rounded shadow"
              key={index}
            >
              <div className="d-flex justify-content-between px-3 mb-2">
                <p className="h6 text-capitalize">{rply.replierName}</p>
                <p className="text-secondary">{rply.replyTime}</p>
              </div>
              <div className="d-flex justify-content-between align-items-center">
                <i className="px-4 col-10">{rply.reply}</i>
              </div>
            </div>)
          }
        </details>

      </div>
      {wantReply && (
        <div className="ms-4">
          <form
            onSubmit={(event) =>
              submitReply(
                event,
                commentDetails.commentId,
                commentReply,
                user.name
              )
            }
          >
            <div className="d-flex justify-content-center">
              <input
                required
                type="text"
                defaultValue={commentReply.current.value || ""}
                ref={commentReply}
                className="form-control me-2"
                placeholder="Submit your reply here..."
              />
              <button
                type="submit"
                className="list-btn py-2 px-3"
                style={{ borderRadius: "20px" }}
              >
                Reply
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

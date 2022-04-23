import React, { useState, Fragment } from "react";
import useAuth from "../../../hooks/useAuth";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import rootAPI from "../../../configurables";
import SingleForumComment from "./SingleForumComment";
import { computeHeadingLevel } from "@testing-library/react";

const SingleForumPost = ({ postDetails, setApiRecall }) => {
	const { user } = useAuth();
	const { v4: uuidv4 } = require("uuid");
	const [newComment, setNewComment] = useState("");
	const [allComment, setAllCommnet] = useState(postDetails.commments || []);

	console.log(postDetails);

	const [reply, setReply] = useState("");

	const onCommentSubmit = (event, postId, name, allComment) => {
		event.preventDefault();
		toast.info("Posting Comment. Please wait!", {
			position: "top-center",
			autoClose: 3000,
		});
		const commentId = uuidv4();
		console.log(commentId);

		const d = new Date();
		const commentTime = `${d.toLocaleString("default", {
			month: "short",
		})}'${d.getDate()} ${d.getFullYear()}`;
		event.preventDefault();
		const commnetString = newComment.trim();
		if (Boolean(commnetString)) {
			const formData = {
				id: postId,
				commments: [
					...allComment,
					{
						commenterName: name,
						commentString: commnetString,
						commentTime: commentTime,
						commentId: commentId,
						replies: [],
					}
				]
			}

			axios
				.post(`${rootAPI}/add_comment_to_blog_post`, formData)
				.then((res) => {
					console.log(res);
					if (res.data.isSuccess) {
						window.location.reload()
						toast.success("Thank you for your valuable comment", {
							position: "top-center",
							autoClose: 3000,
							hideProgressBar: false,
							closeOnClick: true,
							pauseOnHover: true,
							draggable: true,
							progress: undefined,
						});
					} else {
						toast.error(
							"Sorry! There is some technical problem. Please comment again!",
							{
								position: "top-center",
								autoClose: 3000,
								hideProgressBar: false,
								closeOnClick: true,
								pauseOnHover: true,
								draggable: true,
								progress: undefined,
							}
						);
					}
				})
				.catch((error) => {
					console.log(error);
					toast.error(
						"Sorry! There is some technical problem. Please comment again!",
						{
							position: "top-center",
							autoClose: 3000,
							hideProgressBar: false,
							closeOnClick: true,
							pauseOnHover: true,
							draggable: true,
							progress: undefined,
						}
					);
				})
				.finally(() => {
					setNewComment("");
					setApiRecall((prevState) => !prevState);
					console.log("oncommnet submit call sesh");
				});
		}
	};

	const submitReply = (event, commentId, commentReply, name) => {
		event.preventDefault();
		// console.log(commentId, commentReply.current.value, name)
		// return 0

		toast.info("Reply is posting!", {
			position: "top-center",
			autoClose: 1500,
			hideProgressBar: false,
			closeOnClick: true,
			pauseOnHover: true,
			draggable: true,
			progress: undefined,
		});
		const newCommentsWithReply = allComment.map((comment) => {
			if (comment.commentId === commentId) {
				const d = new Date();
				const replyTime = `${d.toLocaleString("default", {
					month: "short",
				})}'${d.getDate()} ${d.getFullYear()}`;
				let prevRepliesWithNewReply = [
					...comment.replies,
					{
						replierName: name,
						replyTime,
						reply: commentReply.current.value,
					},
				];
				return { ...comment, replies: prevRepliesWithNewReply }
			} else {
				return comment
			}
		});

		console.log(newCommentsWithReply);

		axios.post(`${rootAPI}/add_comment_to_blog_post`, {
			id: postDetails._id,
			commments: newCommentsWithReply,
		}).then((res) => {
			window.location.reload()
		})
			.catch((error) => {
				console.log(error);
			});
	};

	return (
		<Fragment>
			<ToastContainer />
			<div className="row justify-content-center mb-5">
				<div className="col-lg-6 forum-post shadow py-3 rounded">
					<div className="d-flex justify-content-between align-items-center">
						<div>
							<h5 className="text-capitalize">
								{postDetails.title}
							</h5>
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
							<p className="text-secondary">
								{postDetails.postTime}
							</p>
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
							onCommentSubmit(
								event,
								postDetails._id,
								user.name,
								allComment
							)
						}
					>
						<div className="d-flex justify-content-center">
							<input
								required
								type="text"
								value={newComment}
								className="form-control me-2"
								placeholder="Submit your comment here..."
								onChange={(e) => setNewComment(e.target.value)}
							/>
							<button
								type="submit"
								className="list-btn py-2 px-3"
								style={{ borderRadius: "20px" }}
							>
								Comment
							</button>
						</div>
					</form>

					{Boolean(allComment.length) ? (
						allComment.map((commentDetails) => (
							<SingleForumComment
								key={commentDetails.commentId}
								commentDetails={commentDetails}
								setReply={setReply}
								reply={reply}
								submitReply={submitReply}
							/>
						))
					) : (
						<p className="text-center my-3 p-2">There is no comment</p>
					)}
				</div>
			</div>
		</Fragment>
	);
};

export default SingleForumPost;

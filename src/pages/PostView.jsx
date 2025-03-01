import React, { useContext, useEffect, useRef, useState } from "react";
import { postCommentContext, postViewContext } from "../contexts/ContextShare";
import SERVER_BASE_URL from "../services/serverURL";
import moment from "moment";
import {
  commentPostAPI,
  getPostCommentAPI,
  getPostDetailsAPI,
} from "../services/allAPI";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";

const PostView = () => {

  const {id} = useParams()

  const commentBoxRef = useRef(null);
  

  //POST VIEW DETAILS CONTEXT SHARE
  const { postViewDetails, setPostViewDetails } = useContext(postViewContext);

  const { postCommentResponse, setPostCommentResponse } =
    useContext(postCommentContext);

  const [commentText, setCommentText] = useState("");
  const [comments, setComments] = useState([]);
  const [error, setError] = useState(null);

  // HANDLE COMMENT POST
  const handleCommentPost = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");

    if (!token) {
      alert("You must be logged in to comment.");
      return;
    }

    const reqHeader = {
      Authorization: token,
      "Content-Type": "application/json",
    };

    try {
      const result = await commentPostAPI(id, { commentText }, reqHeader);

      if (result.status === 201) {
        setCommentText("");
        setPostCommentResponse(result.data);
      } else if (result.status === 400) {
        setError("Comment cannot be empty.");
      }
    } catch (err) {
      console.error("Error posting comment:", err);
      setError("Failed to add comment. Please try again.");
    }
  };

  //GET THE POST DETAILS
  const getPostDetails = async () => {
    const token = localStorage.getItem("token");
    if (token) {
      const reqHeader = {
        Authorization: token,
      };
      try {
        const result = await getPostDetailsAPI(id, reqHeader);
        if (result.status === 200) {
          setPostViewDetails(result.data);
        } else {
          setError("Failed to get post details");
        }
      } catch (error) {
        console.error("Error getting post details:", error);
        setError("Error to get post details");
      }
    }
  };

  //GET ALL COMMENTS OF THE POST
  const getAllComments = async () => {

    const token = localStorage.getItem("token");
    if (token) {
      const reqHeader = {
        Authorization: token,
      };
      try {
        const result = await getPostCommentAPI(id, reqHeader);
        if (result.status === 200) {
          setComments(result.data);
        } else {
          setError("Failed to get comments");
        }
      } catch (error) {
        console.error("Error fetching comments:", error);
      }
    }
  };

  useEffect(() => {
    if (commentBoxRef.current) {
      commentBoxRef.current.scrollTop = commentBoxRef.current.scrollHeight;
    }
  }, [comments]);
  useEffect(() => {
    getAllComments();
    getPostDetails();
  }, [postCommentResponse]);

  return (
    <div className="text-white">
      <Navbar/>
      <div className="pb-10 pt-5 flex flex-col gap-5 border-t-2">
        <div className="flex flex-col gap-2">
          <div className="flex justify-between items-center border-b-2 border-b-gray-700 pb-4">
            <div className="flex flex-col">
              <p className="text-gray-400">
                Posted {moment(postViewDetails?.createdAt).fromNow()}
              </p>
              <p className="text-gray-300">
                Author : {postViewDetails?.userFullName}
              </p>
            </div>
            <p className="text-gray-400">{postViewDetails?.likeCount} Likes</p>
          </div>
          <div className="flex gap-5 flex-col pt-4">
            <h1 className="md:text-5xl text-3xl font-semibold">
              {postViewDetails?.title}
            </h1>
            <p>{postViewDetails?.description}</p>
          </div>
        </div>
        <div className="flex gap-10 flex-col md:flex-row">
          <div className="md:w-1/3">
            <img
              src={`${SERVER_BASE_URL}/${postViewDetails?.thumbnail}`}
              alt=""
            />
          </div>
          <div className="md:w-2/3">
            <p>{postViewDetails?.content}</p>
          </div>
        </div>

        {/* COMMENT SECTION */}
        <div className="">
          <form
            onSubmit={handleCommentPost}
            className="flex md:flex-col gap-5 md:w-1/2 py-5 items-center md:items-start"
          >
            <input
              type="text"
              placeholder="Add a comment"
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              required
              className="px-2 py-5 border-b-2 border-b-gray-700 w-full"
            />
            <button
              type="submit"
              className="border w-max px-5 py-2 h-max rounded-3xl hover:bg-white hover:text-black"
            >
              Send
            </button>
          </form>
          {error && <p className="text-red-500">{error}</p>}

          {/* DISPLAY COMMENTS */}
            <h1 className="text-gray-200 text-xl mb-2">{comments?.length} Comments</h1>
          <div className="mt-5 h-60 overflow-y-auto border border-gray-300 p-2 rounded-md" ref={commentBoxRef}>
            {comments?.map((comment, index) => (
              <p key={index} className="text-white p-2 rounded-md">
                <strong>{comment?.userFullName}:</strong> {comment?.commentText}{" "}
                -{" "}
                <span className="text-xs text-gray-400">
                  {moment(comment?.createdAt).fromNow()}
                </span>
              </p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostView;

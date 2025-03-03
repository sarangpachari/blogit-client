import React, { useContext, useEffect, useState } from "react";
import moment from "moment";
import SERVER_BASE_URL from "../services/serverURL";
import { Link, useNavigate } from "react-router-dom";
import { MdOutlineEdit } from "react-icons/md";
import { IoMdRemoveCircleOutline } from "react-icons/io";
import { deletePostAPI, likePostAPI, unlikePostAPI } from "../services/allAPI";
import { editPostShareContext } from "../contexts/EditPostContext";
import { CiHeart } from "react-icons/ci";
import { FaHeart } from "react-icons/fa";
import {
  postDeleteContext,
  postLikeContext,
  postUnlikeContext,
  postViewContext,
} from "../contexts/ContextShare";
import { tokenContext } from "../contexts/TokenAuth";
import { motion } from "motion/react";

const PostCard = ({ posts, insideDashboard }) => {
  //POST LIKE RESPONSE
  const { postLikeResponse, setPostLikeResponse } = useContext(postLikeContext);

  //POST UNLIKE RESPONSE
  const { postUnlikeResponse, setPostUnlikeResponse } =
    useContext(postUnlikeContext);

  //POST DELETE RESPONSE
  const { postDeleteResponse, setPostDeleteResponse } =
    useContext(postDeleteContext);

  //CHECK USER AVAILABILITY
  const checkUserAvailable = () => {
    const token = localStorage.getItem("token");
    if (token) {
      const userId = JSON.parse(localStorage.getItem("user")).id;
      setUserDetails(userId);
    }
  };

  const { setEditingPost } = useContext(editPostShareContext);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [userDetails, setUserDetails] = useState("");

  const navigate = useNavigate();

  //HANDLE READ MORE CLICK
  const handleReadMore = (post) => {
    if (!userDetails) {
      navigate("/login");
    } else {
      navigate(`/postView/${posts._id}`);
    }
  };

  //HANDLE REMOVE POST
  const handleRemovePost = async (id) => {
    confirm(`Are you sure to delete ${posts?.title} ?`);
    if (confirm) {
      setLoading(true);
      const token = localStorage.getItem("token");
      if (token) {
        const reqHeader = {
          Authorization: token,
        };

        //API CALL
        try {
          const result = await deletePostAPI(id, reqHeader);
          if (result.status === 200) {
            setPostDeleteResponse(result.data);
          }
        } catch (error) {
          console.error(error);
          setError("Unable to delete post. Please try again");
        }
      }
    }
  };

  //HANDLE EDIT POST
  const handleEditPost = (post) => {
    console.log(setEditingPost);

    setEditingPost(post);
  };

  //HANDLE LIKE POST
  const handleLikePost = async (id) => {
    const token = localStorage.getItem("token");
    if (token) {
      const reqHeader = {
        Authorization: token,
      };
      try {
        const result = await likePostAPI(id, reqHeader);
        if (result.status === 200) {
          setPostLikeResponse(result.data);
        } else if (result.status === 400) {
          alert("Already liked");
        }
      } catch (error) {
        console.error(error);
        setError("Unable to like post. Please try again");
      }
    }
  };

  //HANDLE UNLIKE POST
  const handleUnlikePost = async (id) => {
    const token = localStorage.getItem("token");
    if (token) {
      const reqHeader = {
        Authorization: token,
      };
      try {
        const result = await unlikePostAPI(id, reqHeader);
        if (result.status === 200) {
          setPostUnlikeResponse(result.data);
        }
      } catch (error) {
        console.error(error);
        setError("Unable to unlike post. Please try again");
      }
    }
  };

  useEffect(() => {
    checkUserAvailable();
  }, []);

  return (
    <motion.div
      whileInView={{ opacity: 1, x: 0 }}
      initial={{ opacity: 0, x: -100 }}
      transition={{ duration: 1 }}
      className="cursor-pointer"
    >
      <div className="lg:w-3/4 h-full bg-white flex md:flex-row flex-col gap-5">
        {/* IMAGE SECTION */}
        <div className="md:w-1/3">
          <img
            src={`${SERVER_BASE_URL}/${posts?.thumbnail}`}
            className="w-full h-full object-cover"
            alt="Thumbnail"
          />
        </div>
        {/* CONTENT SECTION */}
        <div className="md:w-2/3 w-full pt-5 px-3 flex flex-col justify-between">
          {/* TITLE AND DESCRIPTION */}
          <div>
            <h1
              onClick={() => handleReadMore(posts)}
              className="text-2xl font-semibold"
            >
              {posts?.title}
            </h1>
            {/* DESCRIPTION WITH READ MORE */}
            <p className="text-gray-600 mt-2">
              {posts?.description?.length > 150
                ? `${posts?.description.slice(0, 150)}... `
                : posts?.description}

              <button
                onClick={() => handleReadMore(posts)}
                className="text-blue-500"
              >
                Read More
              </button>
            </p>
          </div>
          {/* AUTHOR AND TIME */}
          <div className="md:flex md:justify-between md:items-center border-t-2 border-t-gray-200 px-2 py-5 mt-5">
            <h1>{`Author : ${posts?.userFullName}`}</h1>
            <p className="text-gray-500 text-sm">
              Posted {moment(posts?.createdAt).fromNow()}
            </p>
          </div>

          {/* FOR MANAGING POSTS */}
          {insideDashboard && (
            <>
              <div className="flex w-full justify-end gap-5 my-5 pe-2">
                <Link to={`/editor/${posts?._id}`}>
                  <button
                    onClick={() => handleEditPost(posts)}
                    className="bg-blue-600 text-white px-3 py-1 flex items-center gap-2"
                  >
                    <MdOutlineEdit />
                    Edit
                  </button>
                </Link>
                <button
                  onClick={() => handleRemovePost(posts?._id)}
                  className="bg-red-500 text-white px-3 py-1 flex items-center gap-2"
                >
                  <IoMdRemoveCircleOutline />
                  Remove
                </button>
              </div>
            </>
          )}

          {/* FOR LIKE POST */}
          {userDetails ? (
            <div className="w-full flex gap-2 items-center justify-end border-t-2 border-t-gray-200">
              <p className="text-gray-600">
                {posts?.comments?.length} Comments
              </p>
              {posts?.likedBy?.includes(userDetails) ? (
                <button
                  className="flex items-center"
                  onClick={() => handleUnlikePost(posts?._id)}
                >
                  <p className="text-gray-600">{posts?.likeCount} Likes</p>
                  <FaHeart
                    size={20}
                    className="m-2 text-red-500 animate-pulse"
                  />
                </button>
              ) : (
                <button
                  className="flex items-center"
                  onClick={() => handleLikePost(posts?._id)}
                >
                  <span className="animate-pulse text-red-600">Like it!</span>
                  <CiHeart size={30} className="m-2 text" />
                </button>
              )}
            </div>
          ) : (
            <div className="w-full flex gap-2 text-sm py-2 justify-end border-t-2 border-t-gray-200">
              <p className="text-gray-600">{posts?.likeCount} Likes</p>
              <p className="text-gray-600">
                {posts?.comments?.length} Comments
              </p>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default PostCard;

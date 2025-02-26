import React, { useState } from "react";
import moment from "moment";
import SERVER_BASE_URL from "../services/serverURL";
import { Link } from "react-router-dom";
import { MdOutlineEdit } from "react-icons/md";
import { IoMdRemoveCircleOutline } from "react-icons/io";
import { deletePostAPI } from "../services/allAPI";

const PostCard = ({ posts, insideDashboard }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

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
            alert("Post removed !")
          }
        } catch (error) {
          console.error(error)
          setError("Unable to delete post. Please try again")
        }
      }
    }
  };

  return (
    <div>
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
            <h1 className="text-2xl font-semibold">{posts?.title}</h1>
            {/* DESCRIPTION WITH READ MORE */}
            <p className="text-gray-600 mt-2">
              {posts?.description?.length > 150
                ? `${posts?.description.slice(0, 150)}... `
                : posts?.description}
              {posts?.description?.length > 150 && (
                <Link to={`/post/${posts._id}`} className="text-blue-500">
                  Read More
                </Link>
              )}
            </p>
          </div>
          {/* AUTHOR AND TIME */}
          <div className="md:flex md:justify-between md:items-center border-t-2 border-t-gray-200 px-2 py-5 mt-5">
            <h1>{`Author : ${posts?.userFullName}`}</h1>
            <p className="text-gray-500 text-sm">
              Posted {moment(posts?.createdAt).fromNow()}
            </p>
          </div>
          {insideDashboard && (
            <>
              <div className="flex w-full justify-end gap-5 my-5 pe-2">
                <button className="bg-blue-600 text-white px-3 py-1 flex items-center gap-2">
                  <MdOutlineEdit />
                  Edit
                </button>
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
        </div>
      </div>
    </div>
  );
};

export default PostCard;

import React, { useContext } from "react";
import { postViewContext } from "../contexts/ContextShare";
import SERVER_BASE_URL from "../services/serverURL";
import moment from "moment";

const PostView = () => {
  //POST VIEW DETAILS CONTEXT SHARE
  const { postViewDetails, setPostViewDetails } = useContext(postViewContext);

  return (
    <div className="text-white">
      <div className="py-10 flex flex-col gap-5">
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
        <div className="flex md:flex-col gap-5 md:w-1/2 py-5 items-center md:items-start">
            <input type="text" placeholder="Add a comment" className="px-2 py-5 border-b-2 border-b-gray-700 w-full" />
            <button className="border w-max px-5 py-2 h-max rounded-3xl hover:bg-white hover:text-black">Send</button>
        </div>
      </div>
    </div>
  );
};

export default PostView;

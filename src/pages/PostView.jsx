import React, { useContext } from "react";
import { postViewContext } from "../contexts/ContextShare";
import SERVER_BASE_URL from "../services/serverURL";

const PostView = () => {
  //POST VIEW DETAILS CONTEXT SHARE
  const { postViewDetails, setPostViewDetails } = useContext(postViewContext);

  return (
    <div className="text-white">
      <div className="py-10 flex flex-col gap-5">
        <div className="flex flex-col gap-2">
          <p className="text-gray-400">{postViewDetails?.likeCount} Likes</p>
          <h1 className="md:text-5xl text-3xl font-semibold">
            {postViewDetails?.title}
          </h1>
          <p>{postViewDetails?.description}</p>
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
      </div>
    </div>
  );
};

export default PostView;

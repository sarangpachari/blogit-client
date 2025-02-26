import React from "react";
import moment from "moment";
import SERVER_BASE_URL from "../services/serverURL";
import { Link } from "react-router-dom";

const PostCard = ({ posts }) => {

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
                <Link
                  to={`/post/${posts._id}`}
                  className="text-blue-500"
                >
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
        </div>
      </div>
    </div>
  );
};

export default PostCard;

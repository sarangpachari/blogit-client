import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { getAllPostsSearchAPI } from "../services/allAPI";
import PostCard from "../components/PostCard";
import { CircularProgress } from "@mui/material";

const AllBlogs = () => {
  const [searchKey, setSearchKey] = useState("");
  const [allPosts, setAllPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    getAllPosts();
  }, [searchKey]);

  //GET ALL POSTS WITH SEARCH
  const getAllPosts = async () => {
    setLoading(true);
    const token = localStorage.getItem("token");

    if (token) {
      const reqHeader = {
        Authorization: token,
      };

      try {
        const result = await getAllPostsSearchAPI(reqHeader, searchKey);
        if (result.status === 200) {
          setAllPosts(result.data);
        }
        setLoading(false);
      } catch (error) {
        setError("Unable to fetch blogs");
        console.error(error);
      }
    }
  };

  return (
    <>
      <div className="mb-10">
        {loading ? (
          <>
            {error ? (
              <>
                {/* ERROR MESSAGE */}
                <p className="text-red-500 mt-3">{error}</p>
              </>
            ) : (
              <div className="h-lvh w-full flex gap-5 flex-col justify-center items-center">
                <CircularProgress color="info" />
                <p className="text-white">Loading...Please Wait</p>
              </div>
            )}
          </>
        ) : (
          <>
            <Navbar />
            <div className="flex md:flex-row flex-col md:items-center gap-5 w-full md:justify-between mt-10">
              <h1 className="text-white text-2xl font-medium">All Blogs </h1>
              <input
                onChange={(e) => setSearchKey(e.target.value)}
                type="text"
                className="text-white px-5 py-2 border bg-gray-500/20 rounded-2xl"
                placeholder="Search by Title"
              />
            </div>

            {/* DISPLAY POSTS */}
            <div className="flex flex-col gap-10 py-10">
              {allPosts.length > 0 ? (
                allPosts.map((posts, index) => (
                  <PostCard key={index} posts={posts} />
                ))
              ) : (
                <div className="font-semibold text-white">
                  Posts Not Found !
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default AllBlogs;

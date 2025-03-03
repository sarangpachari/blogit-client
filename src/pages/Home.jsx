import React, { useContext, useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { tokenContext } from "../contexts/TokenAuth";
import PostCard from "../components/PostCard";
import { getAllPostsAPI } from "../services/allAPI";
import { postLikeContext, postUnlikeContext } from "../contexts/ContextShare";
import { motion } from "motion/react";
import { CircularProgress } from "@mui/material";

const Home = () => {
  //POST LIKE RESPONSE
  const { postLikeResponse, setPostLikeResponse } = useContext(postLikeContext);

  //POST UNLIKE RESPONSE
  const { postUnlikeResponse, setPostUnlikeResponse } =
    useContext(postUnlikeContext);

  const { authorisedUser, setAuthorisedUser } = useContext(tokenContext);
  const [allPosts, setAllPosts] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const getAllPosts = async () => {
    setLoading(true);
    try {
      const result = await getAllPostsAPI();
      if (result.status === 200) {
        setAllPosts(result.data);
      } else {
        setError("Unable to Fetch Posts !");
      }
      setLoading(false);
    } catch (error) {
      console.error(error);
      setError("Server Error. Unable to fetch !");
    }
  };

  useEffect(() => {
    getAllPosts();
  }, [authorisedUser, postLikeResponse, postUnlikeResponse]);
  return (
    <div>
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
          <div className="w-full h-[200px] md:h-[400px] flex flex-col justify-center items-center">
            <motion.hr
              whileInView={{ opacity: 1, x: 0 }}
              initial={{ opacity: 0, x: -100 }}
              transition={{ duration: 1, delay: 1.2 }}
              className="border-2 w-11/12 border-white"
            />
            <motion.h1
              whileInView={{ opacity: 1, z: 0 }}
              initial={{ opacity: 0, z: -5 }}
              transition={{ duration: 1, delay: 2 }}
              className="text-white font-bold lg:text-9xl text-2xl md:text-5xl py-10"
            >
              SHOOT OUT BLOGS
            </motion.h1>
            <motion.hr
              whileInView={{ opacity: 1, x: 0 }}
              initial={{ opacity: 0, x: 50 }}
              transition={{ duration: 1, delay: 1.2 }}
              className="border-2 w-11/12 border-white"
            />
          </div>
          {/* RECENT POSTS */}

          <>
            <motion.div
              whileInView={{ opacity: 1, z: 0 }}
              initial={{ opacity: 0, z: -5 }}
              transition={{ duration: 1, delay: 2.5 }}
              className="flex w-full flex-col gap-5 mb-20"
            >
              <p className="text-white text-xl md:text-3xl tracking-tight">
                Recent Blogs
              </p>
              {allPosts.length > 0 ? (
                allPosts.map((posts) => (
                  <PostCard key={posts?._id} posts={posts} />
                ))
              ) : (
                <p>No Posts yet !</p>
              )}
            </motion.div>
          </>
        </>
      )}
    </div>
  );
};

export default Home;

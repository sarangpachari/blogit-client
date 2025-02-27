import React, { useContext, useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { tokenContext } from "../contexts/TokenAuth";
import PostCard from "../components/PostCard";
import { getAllPostsAPI } from "../services/allAPI";
import { postLikeContext, postUnlikeContext } from "../contexts/ContextShare";

const Home = () => {
  //POST LIKE RESPONSE
  const { postLikeResponse, setPostLikeResponse } = useContext(postLikeContext);

  //POST UNLIKE RESPONSE
  const {postUnlikeResponse,setPostUnlikeResponse} = useContext(postUnlikeContext)

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
      <Navbar />
      <div className="w-full h-[200px] md:h-[400px] flex flex-col justify-center items-center">
        <hr className="border-2 w-11/12 border-white" />
        <h1 className="text-white font-bold lg:text-9xl text-2xl md:text-5xl py-10">
          SHOOT OUT BLOGS
        </h1>
        <hr className="border-2 w-11/12 border-white" />
      </div>
      .{/* RECENT POSTS */}
      <div className="flex w-full flex-col gap-5 mb-20">
        <p className="text-white text-xl md:text-3xl tracking-tight">
          Recent Blogs
        </p>
        {allPosts.length > 0 ? (
          allPosts.map((posts) => <PostCard key={posts?._id} posts={posts} />)
        ) : (
          <p>No Posts yet !</p>
        )}
      </div>
    </div>
  );
};

export default Home;

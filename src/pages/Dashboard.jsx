import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import PostCard from "../components/PostCard";
import { getUserPostsAPI } from "../services/allAPI";

const Dashboard = () => {
  const [userPosts, setUserPosts] = useState([]);
  const [error, setError] = useState(null)
  const [loading,setLoading] = useState(false)

  const getUserPosts = async () => {
    setLoading(true)
    const token = localStorage.getItem("token");
    if (token) {
      const reqHeader = {
        Authorization: token,
      };
      try {
        const result = await getUserPostsAPI(reqHeader);

        if (result.status === 200) {
          setUserPosts(result.data);
          setTimeout(() => {
            setLoading(true)
          }, 3000);
        }else{
          setError("Unable to fetch posts !")
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    getUserPosts();
  }, []);

  

  return (
    <div>
      <Navbar />
      <div className="w-full h-[200px] md:h-[300px] flex justify-center items-center">
        <Link to={"/editor/new"}>
          <Button variant="outlined" color="error">
            <p className="text-3xl md:text-5xl animate-pulse ">Create A Blog</p>
          </Button>
        </Link>
      </div>
      <div className="w-full flex flex-col md:flex-row gap-5 flex-wrap">
        {
          userPosts.length>0?
          userPosts.map((posts)=>(
            <PostCard key={posts?._id} posts={posts}/>
          )):(
            <p className="text-red-600 text-center">No Posts uploaded Yet !</p>
          )
        }
      </div>
    </div>
  );
};

export default Dashboard;

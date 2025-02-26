import React from 'react'
import SERVER_BASE_URL from '../services/serverURL';

const PostCard = ({posts}) => {
    console.log(posts);
    
  return (
    <div>
        <div className="w-full  h-[250px] bg-white flex gap-5">
          <div className="w-1/3">
            <img src={`${SERVER_BASE_URL}/${posts?.thumbnail}`} className="w-full h-full object-cover" alt="Thumbnail" />
          </div>
          <div className="w-2/3 py-5 px-3">
          <h1>{`Author : ${posts?.userFullName}`}</h1>
            <h1 className="text-2xl font-semibold">{posts?.title}</h1>
            <p>{posts?.description}</p>
          </div>
        </div>
    </div>
  )
}

export default PostCard
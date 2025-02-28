import React, { createContext, useState } from 'react'
export const postLikeContext = createContext()
export const postUnlikeContext = createContext()
export const postViewContext = createContext()
export const postCommentContext = createContext()

const ContextShare = ({children}) => {

    const [postLikeResponse,setPostLikeResponse] = useState("")
    const [postUnlikeResponse,setPostUnlikeResponse] = useState("")
    const [postViewDetails,setPostViewDetails] = useState([])
    const [postCommentResponse,setPostCommentResponse] = useState("")

  return (
    <>
    <postLikeContext.Provider value={{postLikeResponse,setPostLikeResponse}}>
        <postUnlikeContext.Provider value={{postUnlikeResponse,setPostUnlikeResponse}}>
            <postViewContext.Provider value={{postViewDetails,setPostViewDetails}}>
              <postCommentContext.Provider value={{postCommentResponse,setPostCommentResponse}}>
                {children}
              </postCommentContext.Provider>
            </postViewContext.Provider>
        </postUnlikeContext.Provider>
    </postLikeContext.Provider>
    </>
  )
}

export default ContextShare
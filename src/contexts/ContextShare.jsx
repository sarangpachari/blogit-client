import React, { createContext, useState } from 'react'
export const postLikeContext = createContext()
export const postUnlikeContext = createContext()
export const postViewContext = createContext()

const ContextShare = ({children}) => {

    const [postLikeResponse,setPostLikeResponse] = useState("")
    const [postUnlikeResponse,setPostUnlikeResponse] = useState("")
    const [postViewDetails,setPostViewDetails] = useState([])

  return (
    <>
    <postLikeContext.Provider value={{postLikeResponse,setPostLikeResponse}}>
        <postUnlikeContext.Provider value={{postUnlikeResponse,setPostUnlikeResponse}}>
            <postViewContext.Provider value={{postViewDetails,setPostViewDetails}}>
                {children}
            </postViewContext.Provider>
        </postUnlikeContext.Provider>
    </postLikeContext.Provider>
    </>
  )
}

export default ContextShare
import React, { createContext, useState } from 'react'
export const postLikeContext = createContext()
export const postUnlikeContext = createContext()

const ContextShare = ({children}) => {

    const [postLikeResponse,setPostLikeResponse] = useState("")
    const [postUnlikeResponse,setPostUnlikeResponse] = useState("")

  return (
    <>
    <postLikeContext.Provider value={{postLikeResponse,setPostLikeResponse}}>
        <postUnlikeContext.Provider value={{postUnlikeResponse,setPostUnlikeResponse}}>
            {children}
        </postUnlikeContext.Provider>
    </postLikeContext.Provider>
    </>
  )
}

export default ContextShare
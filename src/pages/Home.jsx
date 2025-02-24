import React, { useContext, useEffect } from 'react'
import Navbar from '../components/Navbar'
import { tokenContext } from '../contexts/TokenAuth'

const Home = () => {
  const {authorisedUser,setAuthorisedUser} = useContext(tokenContext)

  useEffect(()=>{
  },[authorisedUser])
  return (
    <div>
        <Navbar />
        <div className='w-full h-[300px] md:h-[400px] flex flex-col justify-center items-center'>
            <hr className='border-2 w-11/12 border-white' />
            <h1 className='text-white font-bold lg:text-9xl text-2xl md:text-5xl py-10'>SHOOT OUT BLOGS</h1>
            <hr className='border-2 w-11/12 border-white' />
        </div>
        <p className='text-white'>hello</p>
    </div>
  )
}

export default Home
import React from 'react'
import Navbar from '../components/Navbar'

const Home = () => {
  return (
    <div>
        <Navbar />
        <div className='w-full h-[400px] flex flex-col justify-center items-center'>
            <hr className='border-2 w-11/12 border-white' />
            <h1 className='text-white font-bold text-9xl py-10'>SHOOT OUT BLOGS</h1>
            <hr className='border-2 w-11/12 border-white' />
        </div>
        <p className='text-white'>hello</p>
    </div>
  )
}

export default Home
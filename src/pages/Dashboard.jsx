import React from 'react'
import Navbar from "../components/Navbar"
import { Button } from '@mui/material'

const Dashboard = () => {
  return (
    <div>
      <Navbar />
      <div className="w-full h-[300px] md:h-[400px] flex justify-center items-center">
        <Button variant='outlined' color='error'><p className='text-3xl md:text-5xl '>Create A Blog</p></Button>
      </div>
    </div>
  )
}

export default Dashboard
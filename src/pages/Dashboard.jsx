import React from 'react'
import Navbar from "../components/Navbar"
import { Button } from '@mui/material'

const Dashboard = () => {
  return (
    <div>
      <Navbar />
      <div className="w-full h-[200px] md:h-[300px] flex justify-center items-center">
        <Button variant='outlined' color='error'><p className='text-3xl md:text-5xl animate-pulse '>Create A Blog</p></Button>
      </div>
    </div>
  )
}

export default Dashboard
import Navbar from '@/components/Navbar'
import React from 'react'
import NewAdditions from './NewAdditions'

const page = () => {
  return (
    <div className='md:flex sm:flex md:flex-row sm:flex-col h-screen w-full'>
        <Navbar/>
        <div className="w-full h-full ">
            <NewAdditions/>
        </div>
        
    </div>
  )
}

export default page
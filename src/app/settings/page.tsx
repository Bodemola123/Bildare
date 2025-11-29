import Navbar from '@/components/Navbar'
import React from 'react'
import SettingsPage from './settingsPage';

export const metadata = {
  title: "Settings",
};


const page = () => {
  return (
    <div className='md:flex sm:flex md:flex-row sm:flex-col h-screen w-full'>
        <Navbar/>
        <div className="w-full h-full flex items-center justify-center">
            <SettingsPage/>
        </div>
        
    </div>
  )
}

export default page
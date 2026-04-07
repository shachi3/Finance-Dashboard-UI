import React from 'react'
import { RiNotification4Fill, RiMessage2Fill } from "@remixicon/react";
import logo from '../../assets/logo.png'
import profilepic from '../../assets/propfilepicture.png'

const Header = () => {
  return (
    <>
    <div className='flex justify-between items-center gap-4 p-2 bg-zinc-900 text-white'>
      <div className="logo h-14 w-14 rounded-full flex justify-center items-center">
        <img src={logo} alt="logo" />
      </div>
      <div className="profile flex justify-between items-center gap-4">
      <div className="btn bg-linear-to-r from-purple-300 via-purple-600 to-purple-900 px-4 py-2 rounded-md text-white font-semibold">UPGRADE TO PRO</div>
       <div className="profile flex justify-center items-center gap-2 px-4 py-2 rounded-md text-white font-semibold">
        <img  className='h-10 w-10 rounded-full' src={profilepic} alt="Profile" />
       <div className="">John Doe</div>
       </div>
       <button aria-label="Notifications">
          <RiNotification4Fill size={20} />
        </button>

        <button aria-label="Messages">
          <RiMessage2Fill size={20} />
        </button>
      </div>
    </div>
    </>
  )
}

export default Header
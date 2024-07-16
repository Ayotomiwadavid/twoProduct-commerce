import React from 'react'
import Logo from '../Images/Logo.png'

const Overlay = () => {
  return (
    <div className='w-full h-[100vh] flex items-center justify-center'>
      <img src={Logo} alt='Logo Png' className='h-4/4 w-4/4'/>
    </div>
  )
}

export default Overlay

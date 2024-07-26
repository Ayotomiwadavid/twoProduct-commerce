import React from 'react'
import Logo from '../Images/Logo.png'

const Header = () => {
  return (
    <div className='w-full flex items-center justify-center md:justify-start px-10 top-0 left-0 shadow-sm'>
      <img src={Logo} alt='Logo png' className='w-[250px]'/>
    </div>
  )
}

export default Header

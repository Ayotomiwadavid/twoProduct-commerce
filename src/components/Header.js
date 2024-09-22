import React from 'react'
import Logo from '../Images/Logo.png'

const Header = () => {
  return (
    <div className='w-full flex items-center justify-between md:justify-between md:px-10 top-0 left-0 shadow-sm'>
      <img src={Logo} alt='Logo png' className='w-[170px] md:w-[250px]'/>
      <address className='md:text-xl text-sm'>admin@northeastdivision.com </address>
    </div>
  )
}

export default Header

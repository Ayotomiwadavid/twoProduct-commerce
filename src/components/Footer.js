import React from 'react'
import copyRightLogo from '../Images/smallLogo.jpg'

const Footer = () => {
    const date = new Date();
    const year = date.getFullYear();
  return (
    <footer className='w-full gap-2 bg-black flex items-center justify-between bottom-0 left-0 py-2 px-3'>
    <img src={copyRightLogo} alt='copy right' className='w-[140px] h-[50px]' />
    <p className='md:text-lg text-md items-end font-serif capitalize text-white'>© {year} Northeast Division | All right reserved</p>
    </footer>
  )
}

export default Footer

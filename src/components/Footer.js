import React from 'react'

const Footer = () => {
    const date = new Date();
    const year = date.getFullYear();
  return (
    <footer className='w-full bg-black flex items-center justify-center bottom-0 left-0 p-2'>
    <p className='text-lg font-serif capitalize text-white'>© {year} Northeast Division | All right reserved</p>
    </footer>
  )
}

export default Footer

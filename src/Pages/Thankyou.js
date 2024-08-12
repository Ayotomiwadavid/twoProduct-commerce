import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import checkPaymentStatus from '../Controller';
import { toast } from 'react-toastify';

const Thankyou = () => {

    const alertPaymentStatus = async () => {
        try {
            const status = await checkPaymentStatus();
            console.log(status);

            if (status === 'paid') {
                toast.success('Payment confirmed');
            } else {
                toast.error('Your payment is not correct');
            }
        } catch (error) {
            toast.error('Error checking payment status');
            console.error('Error:', error);
        }
    };

    useEffect(() => {
        alertPaymentStatus();
    }, []);

  return (
    <section className='h-lvh w-full bg-[#fff] flex items-center justify-center'>
      <div className='w-1/2 h-[70%] bg-[#f5f5f5] shadow-2xl rounded-lg flex flex-col items-center justify-center gap-5'>
        <span className='py-1 w-[200px] bg-[#2DCE71] rounded-full'></span>
        <aside className='py-10 px-[50px] gap- flex flex-col items-center justify-center'>
          <h1 className='font-extrabold text-center text-5xl text-[#C9C9C9] uppercase'>Thank you</h1>
          <p className='text-2xl font-sans capitalize text-[#C9C9C9] mt-10'>your order</p>
          <p className='text-2xl font-sans capitalize text-[#C9C9C9]'>is being processed</p>
        </aside>
        <Link to='/' className='bg-[#2DCE71] text-white capitalize font-bold h-[50px] px-4 text-center flex items-center justify-center rounded-md'>
          Continue shopping
        </Link>
      </div>
    </section>
  );
};

export default Thankyou;

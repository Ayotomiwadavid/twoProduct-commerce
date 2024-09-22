import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import checkPaymentStatus from '../Controller';
import { toast } from 'react-toastify';
import emailjs from '@emailjs/browser';
import { ProductData } from '../components/ProductsData';

const Thankyou = () => {
  const publicKey = 'PhLLePIA-QHqs18XW';

  const productDetails = JSON.parse(localStorage.getItem('checkoutTotal')) || {};

  const newProductId = Number(productDetails.ProductId);

  const customerProduct = ProductData.find((product) => product.productId === newProductId) || {};

  const customerDetails = JSON.parse(localStorage.getItem('customerDetails')) || {};

  const sendAdminEmail = (serviceId, templateId, adminMessage) => {
    emailjs
      .send(serviceId, templateId, adminMessage, publicKey)
      .then(
        () => {
          console.log('Admin email sent successfully!');
        },
        (error) => {
          console.log('Failed to send admin email:', error.text);
        }
      );
  };

  const sendCustomerEmail = (serviceId, templateId, customerMessage) => {
    emailjs
      .send(serviceId, templateId, customerMessage, publicKey)
      .then(
        () => {
          console.log('Customer email sent successfully!');
        },
        (error) => {
          console.log('Failed to send customer email:', error.text);
        }
      );
  };

  const alertPaymentStatus = async () => {
    try {
      const status = await checkPaymentStatus();
      console.log(status);

      if (status === 'paid') {
        toast.success('Payment confirmed');
        localStorage.removeItem('sessionId');

        sendAdminEmail('service_6auywpd', 'template_e547rqc', {
          name: customerDetails.name,
          phoneNumber: customerDetails.phoneNumber,
          lastName: customerDetails.lastName,
          address: customerDetails.address, // corrected from "adress"
          country: customerDetails.country,
          email: customerDetails.email,
          productDetails: `The product your buyer bought is ${customerProduct.pro} with a total of $${productDetails.total}. The price per unit is $${customerProduct.ProductPrice}.`,
        });

        sendCustomerEmail('service_6auywpd', 'template_nsmh2c8', {
          name: customerDetails.name,
          phoneNumber: customerDetails.phoneNumber,
          lastName: customerDetails.lastName,
          address: customerDetails.address,
          country: customerDetails.country,
          email: customerDetails.email,
          productDetails: `The product you bought is ${customerProduct.ProductTitle} with a total of $${productDetails.total}. The price per unit is $${customerProduct.ProductPrice}.`,
        });

        localStorage.removeItem('customerDetails');
        localStorage.removeItem('checkoutTotal');
      } else {
        toast.error('Payment not confirmed.');
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
        <aside className='py-10 px-[50px] flex flex-col items-center justify-center'>
          <h1 className='font-extrabold text-center text-5xl text-[#C9C9C9] uppercase'>Thank you</h1>
          <p className='text-2xl font-sans capitalize text-[#C9C9C9] mt-10'>Your order</p>
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

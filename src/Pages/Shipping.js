import React, { useContext, useEffect, useState } from 'react'
import Header from '../components/Header'
import { Context } from '../components/Provider';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { ProductData } from '../components/ProductsData';

const Shipping = () => {

  const { total } = useContext(Context);


  const [formData, setFormData] = useState({
    name: '',
    phoneNumber: '',
    lastName: '',
    adress: '',
    country: '',
    description: '',
    email: ''
  })

  console.log(total);

  const endPointUrl = 'https://techthoth-stripe-server.onrender.com/create-checkout-session';
  const secretKey = 'sk_test_51Pee8D2KbQAq57kGAnP7cKv0gNIBjpRhcNTuZ9MKXdrAm5Js2ERVfaZNhMNHcvr5dtC3SEc06qxCUj0nLOPWo3N500kaI5dx8z';

  const { id } = useParams();

  useEffect(() => {
    const productToBeOrdered = ProductData.find((product) => product.productId = id);
    setFormData((prevValue) => {
      return{
        ...prevValue,
        name: productToBeOrdered.ProductTitle
      }
    })
  }, [])

  const requestBodyObject = {
    stripeSecretKey: secretKey,
    productPrice: total * 100,
    productName: 'North east division products Check out',
    mode: 'payment',
    paymentMethod: 'card',
    successUrl: 'http://localhost:3000/thank-you',
    cancelUrl: 'http://localhost:3000/',
    quantity: 1,
    currency: 'usd'
  };

  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(requestBodyObject)
  };


  const handlePayment = (e) => {
    e.preventDefault();
    console.log('clicked');
    console.log(formData)

    //prepare against page reload
    const localStorageData = {
      ProductId: id,
      total: total
    }

    console.log(localStorageData);

    localStorage.setItem('checkoutTotal', JSON.stringify(localStorageData));

    let valid;


    if (formData && formData.adress && formData.country && formData.lastName && formData.name && formData.phoneNumber ) {
      valid = true
      localStorage.setItem('customerDetails', JSON.stringify(formData))
    } else {
      valid = false
    }

    if (valid) {
      fetch(endPointUrl, options)
        .then(response => {
          if (response.ok) {
            return response.json();
          }
          return response.json().then(json => Promise.reject(json));
        })
        .then(data => {
          console.log(data); // Log the full response data to inspect it
          localStorage.setItem('sessionId', data.sessionId);
          window.location = data.url
        })
        .catch(err => {
          console.error('An Error Occurred:', err.message);
        });
    } else {
      toast.error('Fill All Your Shipping Details First')
      console.error('Fill All Your Shipping Details First');
    }
  };

  const handleInputChange = (e) => {
    const { value, name } = e.target;
    setFormData((prevValue) => {
      return {
        ...prevValue,
        [name]: value
      }
    })
  }

  return (
    <section id="crud-modal" tabIndex="-1" aria-hidden="true" className="transition-all flex-col duration-500 flex justify-center items-center w-full md:inset-0 h-full max-h-full">
      <Header />
      <div className="relative p-4 w-full max-w-md max-h-full">
        {/* <!-- Modal content --> */}
        <div className="relative bg-white rounded-lg shadow">
          {/* <!-- Modal header --> */}
          <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t">
            <h3 className="text-lg font-semibold text-gray-900 ">
              Shipping Details
            </h3>
          </div>
          {/* <!-- Modal body --> */}
          <form className="p-4 md:p-5">
            <div className="grid gap-4 mb-4 grid-cols-2">
              <div className="col-span-2">
                <label for="name" className="block mb-2 text-sm font-medium text-gray-900">Name</label>
                <input type="text" onChange={handleInputChange} name="name" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" placeholder="Type product name" required="" />
              </div>
              <div className="col-span-2 sm:col-span-1">
                <label for="phoneNumber" className="block mb-2 text-sm font-medium text-gray-900">Phone Number</label>
                <input type="tel" onChange={handleInputChange} name="phoneNumber" id="phoneNumber" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" placeholder="+23***4545**" required="" />
              </div>
              <div className="col-span-2 sm:col-span-1">
                <label for="lastName" className="block mb-2 text-sm font-medium text-gray-900"> Last Name</label>
                <input type="text" onChange={handleInputChange} name="lastName" id="lastName" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" placeholder="Tomiwa David" required="" />
              </div>
              <div className="col-span-2">
                <label for="email" className="block mb-2 text-sm font-medium text-gray-900">Email Address</label>
                <input type="email" onChange={handleInputChange} name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" placeholder="john123@doe.com" required="" />
              </div>
              <div className="col-span-2">
                <label for="adress" className="block mb-2 text-sm font-medium text-gray-900">Residential Address</label>
                <input type="text" onChange={handleInputChange} name="adress" id="adress" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" placeholder="G15 ojabalu streeet..." required="" />
              </div>
              <div className="col-span-2">
                <label for="country" className="block mb-2 text-sm font-medium text-gray-900">Country / Region</label>
                <input type="text" onChange={handleInputChange} name="country" id="country" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" placeholder="United Kingdom" required="" />
              </div>
              <div className="col-span-2">
                <label for="description" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Additional Details</label>
                <textarea id="description" name='description' onChange={handleInputChange} rows="4" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500" placeholder="Add any additional details"></textarea>
              </div>
            </div>
            <button onClick={handlePayment} className="text-white inline-flex items-center bg-black focus:ring-4 focus:outline-none  font-medium rounded-lg text-sm px-5 py-2.5 text-center">
              <svg className="me-1 -ms-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clip-rule="evenodd"></path></svg>
              Checkout
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}

export default Shipping

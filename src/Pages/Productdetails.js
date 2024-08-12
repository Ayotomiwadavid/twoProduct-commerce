import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Link, useParams } from "react-router-dom";
import { ProductData } from "../components/ProductsData";

const Productdetails = () => {
  const { id } = useParams();
  const [quantity, setQuantity] = useState(1);
  const [imageIndex, setImageIndex] = useState(0);
  const [modalVisibility, setModalVisibility] = useState(false)

  // Ensure the correct type comparison (string vs number)
  let detailedProduct = ProductData.find(
    (data) => data.productId.toString() === id
  );

  const [total, setTotal] = useState(detailedProduct.ProductPrice * quantity)


  const increaseQuantity = () => {
    setQuantity(prevValue => prevValue + 1);
  }

  const decreaseQuantity = () => {
    setQuantity(prevValue => {
      if (prevValue !== 1) {
        return prevValue - 1
      } else {
        return prevValue = 1
      }
    });
  }

  useEffect(() => {
    setTotal(detailedProduct.ProductPrice * quantity);
  }, [quantity, detailedProduct.ProductPrice]);

  useEffect(() => {
    console.log(total)
  }, [total])

  const changeImage = (index) => {
    setImageIndex(index);
  }

  const endPointUrl = 'https://techthoth-stripe-server.onrender.com/create-checkout-session';
  const secretKey = 'sk_test_2IIZj9qvETFVO3EvJYJHAUQ100SCzRfnk5';

  const requestBodyObject = {
    stripeSecretKey: secretKey,
    productPrice: total * 100,
    productName: 'Lets create products Check out',
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
    let valid = true;

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
      console.error('Fill All Your Shipping Details First');
    }
  };

  const handleModalVisibility = () => {
    setModalVisibility((prevValue) => {
      return !prevValue
    })
  }



  if (!detailedProduct) {
    return (
      <section className="w-full flex flex-col justify-center items-center">
        <Header />
        <main className="w-full flex flex-col gap-4 items-center justify-center px-[5vw]">
          <aside className="w-full flex py-5 items-center justify-start px-5">
            <Link to="/">
              <button className="font-bold text-md py-1 px-2 md:text-lg font-serif outline-none border-[1px] border-[#000] md:py-2 md:px-4">
                Back
              </button>
            </Link>
          </aside>
          <p>Product not found</p>
        </main>
        <Footer />
      </section>
    );
  }

  return (
    <section className="w-full flex flex-col justify-center items-start">
      <Header />
      {
        /* <!-- Main modal --> */
        modalVisibility && <div id="crud-modal" tabindex="-1" aria-hidden="true" class="overflow-y-auto transition-all duration-500 flex bg-black bg-opacity-50 overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-full max-h-full">
        <div class="relative p-4 w-full max-w-md max-h-full">
          {/* <!-- Modal content --> */}
          <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
            {/* <!-- Modal header --> */}
            <div class="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
              <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
                Shipping Details
              </h3>
              <button type="button" class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" onClick={handleModalVisibility} data-modal-toggle="crud-modal">
                <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                </svg>
                <span class="sr-only">Close modal</span>
              </button>
            </div>
            {/* <!-- Modal body --> */}
            <form class="p-4 md:p-5">
              <div class="grid gap-4 mb-4 grid-cols-2">
                <div class="col-span-2">
                  <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name</label>
                  <input type="text" name="name" id="name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Type product name" required="" />
                </div>
                <div class="col-span-2 sm:col-span-1">
                  <label for="phoneNumber" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Phone Number</label>
                  <input type="number" name="phoneNumber" id="phoneNumber" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="+23***4545**" required="" />
                </div>
                <div class="col-span-2 sm:col-span-1">
                  <label for="lastName" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"> Full Name</label>
                  <input type="text" name="lastName" id="lastName" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Tomiwa David" required="" />
                </div>
                <div class="col-span-2">
                  <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Residential Address</label>
                  <input type="text" name="name" id="name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="G15 ojabalu streeet..." required="" />
                </div>
                <div class="col-span-2">
                  <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Country / Region</label>
                  <input type="text" name="name" id="name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="United Kingdom" required="" />
                </div>
                <div class="col-span-2">
                  <label for="description" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Additional Details</label>
                  <textarea id="description" rows="4" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Add any additional details"></textarea>
                </div>
              </div>
              <button onClick={handlePayment} class="text-white inline-flex items-center bg-black focus:ring-4 focus:outline-none  font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                <svg class="me-1 -ms-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clip-rule="evenodd"></path></svg>
                Checkout
              </button>
            </form>
          </div>
        </div>
      </div>
      }
      <main className="w-full flex flex-col items-center justify-center md:px-[5vw]">
        <aside className="w-full flex py-2 mt-2 items-center justify-start px-5">
          <Link to="/">
            <button className="font-bold text-md py-1 px-2 md:text-lg font-serif outline-none border-[1px] border-[#000] md:py-2 md:px-4">
              Back
            </button>
          </Link>
        </aside>
        <article className="flex flex-col justify-center items-center gap-4 px-3 w-full md:my-3 md:justify-between md:flex-row">
          <div className="flex flex-col w-full items-center justify-start py-12 gap-5 md:w-1/2 md:h-lvh">
            <div className="w-full flex items-center justify-center">
              <img
                src={detailedProduct.ProductImage[imageIndex]}
                alt=""
                className="w-[50%]"
              />
            </div>
            <div className="flex w-full gap-3 items-center justify-center">
              {detailedProduct.ProductImage.map((image, index) => (
                <img
                  src={image}
                  alt=""
                  className="w-[90px] h-[90px]"
                  key={index}
                  id={index}
                  onClick={() => changeImage(index)}
                />
              ))}
            </div>
          </div>
          <aside className="w-full gap-2 md:py-10 flex flex-col items-center md:h-lvh justify-center md:items-start md:justify-start md:w-1/2 md:px-10">
            <h2 className="font-bold text-2xl w-full capitalize font-serif my-4 md:text-3xl text-left">
              {detailedProduct.ProductTitle}
            </h2>
            <p className="font-serif text-left">{detailedProduct.ProductDescription}</p>
            <h1 className="tracking-wider w-full text-left text-xl py-3">{`$${detailedProduct.ProductPrice}.00`}</h1>
            <div className="flex gap-5 items-center md:justify-start justify-between w-full">
              <div className="flex items-center justify-between gap-2 bg-[#f5f5f5] px-4 h-[45px] md:w-[150px]">
                <button className="cursor-pointer px-3 font-bold text-lg" onClick={increaseQuantity}>+</button>
                {quantity}
                <button className="cursor-pointer px-3 font-bold text-lg" onClick={decreaseQuantity}>-</button>
              </div>
              <button onClick={handleModalVisibility} className="capitalize h-[45px] flex justify-center items-center text-xl rounded-lg my-4 py-3 font-bold bg-black text-white px-4">
                Check out
              </button>
            </div>
          </aside>
        </article>
      </main>
      <Footer />
    </section>
  );
};

export default Productdetails;

import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Link, useParams } from "react-router-dom";
import { ProductData } from "../components/ProductsData";

const Productdetails = () => {
  const { id } = useParams();
  const [quantity, setQuantity] = useState(1);
  const [imageIndex, setImageIndex] = useState(0);

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
              <Link to={`/shippingDetails/check-out/${detailedProduct.productId}`}>
                <button className="capitalize h-[45px] flex justify-center items-center text-xl rounded-lg my-4 py-3 font-bold bg-black text-white px-4">
                  Check out
                </button>
              </Link>
            </div>
          </aside>
        </article>
      </main>
      <Footer />
    </section>
  );
};

export default Productdetails;

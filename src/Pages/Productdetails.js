import React, { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Link, useParams } from "react-router-dom";
import firstProduct from "../Images/FirstProduct.png";
import { ProductData } from "../components/ProductsData";

const Productdetails = () => {
  const { id } = useParams();
  const [quantity, setQuantity] = useState(1);
  const [imageIndex, setImageIndex] = useState(0);

  // Ensure the correct type comparison (string vs number)
  let detailedProduct = ProductData.find(
    (data) => data.productId.toString() === id
  );


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

  const changeImage = (index) => {
    setImageIndex(index);
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
    <section className="w-full flex flex-col justify-center items-center">
      <Header />
      <main className="w-full flex flex-col items-center justify-center md:px-[5vw]">
        <aside className="w-full flex py-5 items-center justify-start px-5">
          <Link to="/">
            <button className="font-bold text-md py-1 px-2 md:text-lg font-serif outline-none border-[1px] border-[#000] md:py-2 md:px-4">
              Back
            </button>
          </Link>
        </aside>
        <article className="flex flex-col justify-center items-center gap-4 px-3 w-full md:my-3 md:justify-between md:flex-row">
          <div className="flex flex-col w-full items-center justify-start md:justify-center gap-5 md:w-1/2 h-lvh">
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
          <aside className="w-full gap-2 h-full md:py-10 flex flex-col items-center justify-center md:items-start md:justify-start md:w-1/2 md:px-10">
            <h2 className="font-bold text-3xl capitalize font-serif my-4">
              {detailedProduct.ProductTitle}
            </h2>
            <p>{detailedProduct.ProductDescription}</p>
            <h1 className="tracking-wider text-xl py-3">{`$${detailedProduct.ProductPrice}.00`}</h1>
            <div className="flex gap-5 items-center justify-start w-full">
              <div className="flex items-center justify-between gap-2 bg-[#f5f5f5] px-4 h-[45px] w-[150px]">
                <button className="cursor-pointer px-3 font-bold text-lg" onClick={increaseQuantity}>+</button>
                {quantity}
                <button className="cursor-pointer px-3 font-bold text-lg" onClick={decreaseQuantity}>-</button>
              </div>
              <button className="capitalize h-[45px] flex justify-center items-center text-xl rounded-lg my-4 py-3 font-bold bg-black text-white px-4">
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

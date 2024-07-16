import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";
import firstProduct from "../Images/FirstProduct.png"
import secondProduct from '../Images/SecondProduct.png'

const Productdetails = () => {
  return (
    <section className="w-full flex flex-col justify-center items-center">
      <Header />
      <main className="w-full flex flex-col gap-4 items-center justify-center px-[5vw]">
        <aside className="w-full flex py-5 items-center justify-start px-5">
          <Link to="/">
            <button className="font-bold text-lg font-serif outline-none border-[1px] border-[#000] py-2 px-4">
              Back
            </button>
          </Link>
        </aside>
        <aside className="flex gap-5 w-full px-4 py-[30px] h-[80vh] items-center justify-start">
            <div className="w-[40%] flex flex-col gap-3 h-full">
                <img src={firstProduct} alt="" />
                <div className="flex gap-3 items-center justify-start py-3">
                <img src={firstProduct} alt="" className="w-[90px] h-[90px]"/>
                <img src={firstProduct} alt="" className="w-[90px] h-[90px]"/>
                <img src={firstProduct} alt="" className="w-[90px] h-[90px]"/>
                </div>
            </div>
            <article className="flex flex-col items-start justify-center w-[55%] h-full">
                
            </article>
        </aside>
      </main>
      <Footer />
    </section>
  );
};

export default Productdetails;

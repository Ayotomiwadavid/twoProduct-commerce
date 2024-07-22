import React from "react";
import FirstProduct from '../Images/FirstProduct.png'
import SecondProduct from '../Images/SecondProduct.png'

const Productcard = ({productTitle, productPrice, productImage}) => {
  return (
    <aside className="flex flex-col items-center justify-center gap-3 px-3 hover:shadow-lg cursor-pointer transition-all duration-500">
      <div className="w-[350px] h-[250px] cursor-pointer rounded-md ">
      <img src={productImage === 'FirstProduct' ? FirstProduct: SecondProduct} alt="product png" />
      </div>
      <div className="w-full flex px-3 justify-between items-center py-5">
        <h6 className="font-bold font-serif text-lg">{productTitle}</h6>
        <div className="rounded-sm flex items-center justify-center w-fit px-1">
          <p className="font-bold text-md capitalize text-center">{productPrice}</p>
        </div>
      </div>
    </aside>
  );
};

export default Productcard;

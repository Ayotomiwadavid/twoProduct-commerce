import React from "react";
import { Link } from "react-router-dom";

const Productcard = ({
  productTitle,
  productPrice,
  productImage,
  productId,
}) => {
  return (
    <>
      <Link to={`/productDetails/:${productId}`}>
        <aside
          className="flex flex-col items-center justify-center gap-3 px-3 hover:shadow-lg cursor-pointer transition-all duration-500"
          id={productId}
        >
          <div className="w-[350px] h-[250px] cursor-pointer rounded-md ">
            <img src={productImage} alt="product png" />
          </div>
          <div className="w-full flex px-3 justify-between items-center py-5">
            <h6 className="font-bold font-serif text-lg">{productTitle}</h6>
            <div className="rounded-sm flex items-center justify-center w-fit px-1">
              <p className="font-bold text-md capitalize text-center">{`$${productPrice}.00`}</p>
            </div>
          </div>
        </aside>
      </Link>
    </>
  );
};

export default Productcard;

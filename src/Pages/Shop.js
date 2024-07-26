import React, { useEffect, useState } from "react";
import Overlay from "../components/Overlay";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Productcard from "../components/Productcard";
import { ProductData } from "../components/ProductsData";

const Shop = () => {

  //STATE MANAGEMENT STARTS HERE
  let [overVisibility, setOverlayVisibility] = useState(false);

  useEffect(() => {
    setInterval(() => {
      setOverlayVisibility(true);
    }, 3000);
  }, []);

  return (
    <>
      {!overVisibility ? (
        <Overlay />
      ) : (
        <section className="flex flex-col items-center gap-5 justify-center">
          <Header />
          <main className="md:py-[70px] py-[30px] md:h-[100vh] flex flex-col items-center justify-start">
            <aside className="flex flex-col gap-11 items-center justify-center p-[30px] mt-10 md:flex-row">
              {ProductData.map((product, index) => (
                  <Productcard
                    productImage={product.ProductImage[0]}
                    productPrice={product.ProductPrice}
                    productTitle={product.ProductTitle}
                    key={index}
                    id={product.productId}
                    productId={product.productId}
                  />
              ))}
            </aside>
          </main>
          <Footer />
        </section>
      )}
    </>
  );
};

export default Shop;

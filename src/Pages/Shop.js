import React, { useEffect, useState } from 'react'
import Overlay from '../components/Overlay'
import Header from '../components/Header';
import Footer from '../components/Footer';
import Productcard from '../components/Productcard';

const Shop = () => {

  //PRODUCT OBJECT
  const productDetails = [
    {
      id: '1product',
      productTitle: 'Adopt-A-Gun Shirt',
      productDescription: 'The Adopt-A-Gun shirt is crafted from a robust 7.5 oz heavyweight fabric, making it an ideal choice for those seeking durability and comfort. This shirt is built to withstand the rigors of everyday wear while providing a soft and comfortable fit. The reinforced stitching ensures long-lasting quality, while the lycra mock ribbing on the collar adds a touch of style and flexibility.',
      productPrice: '$42.00',
      productImage: 'FirstProduct'
    },
    {
      id: '2product',
      productTitle: 'Northeast Division Shirt',
      productDescription: "The Northeast Division shirt is a classic 6.0 oz t-shirt made from 100% cotton, providing a soft and breathable feel that's perfect for everyday wear. Its lightweight construction makes it a comfortable choice for all-day wear, while the high-quality cotton fabric ensures a premium feel. Ideal for casual outings, this shirt offers a timeless design that pairs well with any wardrobe.",
      productPrice: '$32.00',
      productImage: 'SecondProduct'
    }
  ]

  //STATE MANAGEMENT STARTS HERE
  let [overVisibility, setOverlayVisibility] = useState(false);

  useEffect(() => {
    setInterval(() => {
      setOverlayVisibility(true)
    }, 3000);
  }, [])

  return (
    <>
{   !overVisibility ? <Overlay /> :
  <section className='flex flex-col items-center gap-5 justify-center'>
      <Header />
      <main className='md:py-[70px] py-[30px] md:h-[100vh] flex flex-col items-center justify-start'>
        <aside className='flex flex-col gap-11 items-center justify-center p-[30px] mt-10 md:flex-row'>
          {
            productDetails.map((productdetail, index) => (
              <Productcard 
                productImage={productdetail.productImage}
                productPrice={productdetail.productPrice}
                productTitle={productdetail.productTitle}
                key={index}
                id={productdetail.id}
              />
            ))
          }
        </aside>
      </main>
      <Footer />
    </section>}
    </>
  )
}

export default Shop

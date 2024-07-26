//FIRST PRODUCT IMAGE
import FirstProductImage from '../Images/FirstProduct.png'
import firstP2 from '../Images/FirstP2.png'
import firstP3 from '../Images/FirstP3.png'

//SECOND PRODUCT IMAGE
import secondProduct from '../Images/SecondProduct.png'
import secondp2 from '../Images'
import secondp3 from '../Images/SecondP3.png'

const ProductData = [
    {
        ProductTitle: 'Adopt-A-Gun Shirt',
        ProductImage:[
            FirstProductImage,
            firstP2,
            firstP3,
        ],
        ProductDescription: "The Adopt-A-Gun shirt is crafted from a robust 7.5 oz heavyweight fabric, making it an ideal choice for those seeking durability and comfort. This shirt is built to withstand the rigors of everyday wear while providing a soft and comfortable fit. The reinforced stitching ensures long-lasting quality, while the lycra mock ribbing on the collar adds a touch of style and flexibility.",
        ProductPrice: 42.00
    },
    {
        ProductTitle: 'Northeast Division Shirt',
        ProductImage:[
            secondProduct,
            secondp2,
            secondp3
        ],
        ProductDescription: "The Northeast Division shirt is a classic 6.0 oz t-shirt made from 100% cotton, providing a soft and breathable feel that's perfect for everyday wear. Its lightweight construction makes it a comfortable choice for all-day wear, while the high-quality cotton fabric ensures a premium feel. Ideal for casual outings, this shirt offers a timeless design that pairs well with any wardrobe.",
        ProductPrice: 32.00
    }
];

exports = ProductData;
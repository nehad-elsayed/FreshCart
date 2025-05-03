// import { Button } from "@heroui/react";
import { Button } from "@heroui/react";
import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  addProductToCart,
  addProductToWishList,
  removeWishListItem,
} from "../../services/secvices";
import "animate.css";
import { authContext } from "../../contexts/authContext";
import toast from "react-hot-toast";


export default function Product({ product }) {
  const [addToCartLoading, setAddToCartLoading] = useState(false);
  const [addToWishListLoading, setAddToWishListLoading] = useState(false);
  const [addedToWishlist, setAddedToWishlist] = useState(false);
const{isLoggedIn}= useContext(authContext);
const navigate=useNavigate()

// caht gpt 

// const [cart, setCart] = useState([]);

// const addToCart = (product) => {
//   const exists = cart.find((item) => item.id === product._id);
//   if (!exists) {
//     setCart([...cart, product]);
//   }
// };


// chat gpt 


  const handleAddToWishlist = () => {
    addProductToWishList(product._id, setAddToWishListLoading);
    setAddedToWishlist(true);
  };

 const[productID,setProductID]=useState()
  const [wishlist, setWishlist] = useState([]);
  const [isInWishlist, setIsInWishlist] = useState(false);

// useEffect(() => {
//     const fetchWishlist = async (productId) => {
//       try {
//         const response = await axios.get(`https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`);
//         setWishlist(response.data.data);
//         setProductID(data.data.product._id)
//         setIsInWishlist(true)
//       } catch (error) {
//         console.error("Error fetching wishlist", error);
//       }
//     };

//     fetchWishlist();
//   }, []);

  // const[productID,setProductID]=useState()
  // const [wishlist, setWishlist] = useState([]);
  // const [isInWishlist, setIsInWishlist] = useState(false);
  // // Fetch wishlist items
  // useEffect(() => {
  //   const fetchWishlist = async (productId) => {
  //     try {
  //       const response = await axios.get(
  //         `https://ecommerce.routemisr.com/api/v1/wishlist/`+productId
  //       );
  //       setWishlist(response.data.data);
  //       setProductID(data.data.product._id)

  //     } catch (error) {
  //       console.error("Error fetching wishlist", error);
  //     }
  //   };

  //   fetchWishlist();
  // }, []);
  // // Check if the product is in the wishlist
  // useEffect(() => {
  //   setIsInWishlist(wishlist.some((item) => item.id === productID));
  // }, [wishlist, productID]);


function loginFrist(){
  toast.error("you should Login frist")
  navigate("/signin")
}

  return (
    <>
      <div className="sm:mt-4 md:mt-0 hover:scale-110 transition duration-500 relative flex w-full  flex-col overflow-hidden rounded-lg border border-gray-100 bg-slate-500 text-sky-400 dark:text-sky-800 dark:bg-white shadow-md">
        <Link
          to={"/productDetails/" + product._id}
          className="relative mx-3 mt-3 flex h-60 overflow-hidden rounded-xl"
        >
          <img
            className="object-cover w-full rounded-md mt-5"
            src={product.imageCover}
            alt="product image"
          />
          {product.priceAfterDiscount && (
            <span className="absolute top-0 left-0  me-3 mt-1 mb-3 rounded-lg bg-black dark:bg-sky-600 dark:text-white p-2 text-center text-sm font-medium text-white">
              {Math.round(
                100 - (product.priceAfterDiscount * 100) / product.price
              )}
              %
            </span>
          )}
        </Link>
        <div className="mt-4 px-5 pb-5">
          <Link to={"/productDetails/" + product._id}>
            <h5 className="text-xl tracking-tight text-slate-100 dark:text-sky-700 line-clamp-1">
              {
                // product.title.split(" ",2).join(" ")
                product.title
              }
            </h5>
          </Link>
          <div className="mt-2 mb-5 flex flex-col gap-1 items-center justify-between ">
            {product.priceAfterDiscount ? (
              <p>
                <span className="text-3xl font-bold text-slate-100 dark:text-yellow-700">
                  {product.priceAfterDiscount}$
                </span>
                <span className="text-sm text-slate-100 dark:text-sky-600 line-through m-px">
                  {product.price}$
                </span>
              </p>
            ) : (
              <span className="text-3xl font-bold text-slate-100 dark:text-yellow-700">
                {product.price}$
              </span>
            )}
            <div className="flex items-center">
              {[1, 2, 3, 4, 5].map((rate, index) => {
                return rate < product.ratingsAverage ? (
                  <svg
                    key={index}
                    aria-hidden="true"
                    className="h-5 w-5 text-yellow-300"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ) : (
                  <svg
                    key={index}
                    aria-hidden="true"
                    className="h-5 w-5 text-defult-300"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                );
              })}

              <span className="mr-2  rounded bg-yellow-200 ml-1 p-1  text-xs font-semibold">
                {product.ratingsAverage}
              </span>
            </div>
          </div>
          <Button
            isLoading={addToCartLoading}
            onPress={() => { isLoggedIn? addProductToCart(product._id, setAddToCartLoading): loginFrist() }}
            className="w-full hover:opacity-90 flex items-center mx-auto justify-center rounded-md bg-slate-900 dark:bg-slate-600 dark:text-white px-5 py-2 text-center text-sm font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-blue-300 animate__animated animate__bounceInDown animate__delay-3s animate__slow "
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="mr-2 h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
            Add to cart
          </Button>
        </div>
        <div>
          {/* <Button
            isLoading={addToWishListLoading}
            onPress={() =>
              addProductToWishList(product._id, setAddToWishListLoading)
            }
            className="icon my-1 w-fit  md:w-60 rounded-lg text-center  mx-auto bg-sky-900 text-white"
            color=""
          >
            {" "}
            Add to wishList{" "}
            <span>
              <i className="fa-solid fa-heart text-white"></i>
            </span>{" "}
          </Button> */}

          <Button
            isLoading={addToWishListLoading}
            onPress={()=>{isLoggedIn? handleAddToWishlist() : loginFrist() }}
            className={` mx-auto my-4 bg-gray-200 flex gap-2 items-center text-gray-800  px-5 py-2.5 text-center text-sm font-medium rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2
   ${
     addedToWishlist ? (
       <i className="fa-solid fa-heart text-xl text-red-500"></i>
     ) : (
       <i className="fa-solid fa-heart text-xl text-red"></i>
     )
   }`}
          >
            <i
              className={`fa-solid fa-heart text-[1rem] ${
                addedToWishlist ? "text-red-500" : "text-white"
              }`}
            ></i>
            Wishlist
          </Button>
        </div>
      </div>
    </>
  );
}

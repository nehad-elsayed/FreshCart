import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Loading from "../../components/LoadingScreen/Loading";
import Slider from "react-slick";
import { Button } from "@heroui/react";
import {
  addProductToCart,
  addProductToWishList,
} from "../../services/secvices"; //we made folder for services to make our code more clean
import { authContext } from "../../contexts/authContext";
import toast from "react-hot-toast";

export default function ProductDetails() {
  const { id } = useParams(); //because we recieve id from path in App.jsx
  const [productDetails, setProductDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [addToCartLoading, setAddToCartLoading] = useState(false);
  const [addToWishListLoading, setAddToWishListLoading] = useState(false);
  const [addedToWishlist, setAddedToWishlist] = useState(false);
  const { isLoggedIn } = useContext(authContext);
  const navigate = useNavigate();

  const handleAddToWishlist = () => {
    addProductToWishList(id, setAddToWishListLoading);
    setAddedToWishlist(true);
  };

  //seeting for slider====>>>>>>>>>>
  var settings = {
    dots: true,
    infinite: true,
    speed: 100,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  //calling Api====>>>>>>>>>>>>
  async function getProductDetails() {
    setIsLoading(true);
    let { data } = await axios.get(
      "https://ecommerce.routemisr.com/api/v1/products/" + id
    );
    setProductDetails(data.data);
    setIsLoading(false);
  }
  useEffect(() => {
    getProductDetails();
  }, []);

  if (isLoading) {
    return <Loading />; //loading screen
  }

  function loginFrist() {
    toast.error("you should Login frist");
    navigate("/signin");
  }

  return (
    <>
      <div className="bg-slate-100 dark:bg-sky-950 p-3">
        <div className="flex items-center flex-wrap ">
          <div className="w-full md:w-1/3 px-4 mb-8">
            <Slider
              {...settings}
              className="w-3/4 bg-slate-100 mx-auto rounded-lg"
            >
              {productDetails?.images.map((img, index) => {
                return (
                  <img
                    src={img}
                    key={index}
                    alt={productDetails?.title}
                    className="w-full  rounded-lg shadow-md "
                    id="main-image"
                  />
                );
              })}
            </Slider>
          </div>
          <div className="w-full md:w-2/3 px-4">
            <h2 className="text-3xl text-yellow-800 dark:text-yellow-500 font-bold mb-2">
              {productDetails?.title.split(" ", 3).join(" ")}
            </h2>
            <p className="text-yellow-700 dark:text-yellow-500 mb-4 mt-4">
              SKU: WH1000XM4
            </p>
            <div className="mb-4">
              <span className="text-2xl text-yellow-500 dark:text-yellow-500 font-bold mr-2">
                ${productDetails?.price}
              </span>
              <span className="text-yellow-500 dark:text-yellow-500 line-through">
                ${productDetails?.price + 200}
              </span>
            </div>
            <div className="flex items-center mb-4">
              {[1, 2, 3, 4, 5].map((rate, index) => {
                return rate < productDetails.ratingsAverage ? (
                  <svg
                    key={index}
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="size-6 text-yellow-500 "
                  >
                    <path
                      fillRule="evenodd"
                      d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
                      clipRule="evenodd"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="size-6 text-slate-300"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
                      clipRule="evenodd"
                    />
                  </svg>
                );
              })}

              <span className="ml-2 text-yellow-500 dark:text-yellow-500">
                {productDetails?.ratingsAvreage} (
                {productDetails?.ratingsQuatity} reviews)
              </span>
            </div>
            <p className="text-yellow-700 p-6 dark:text-yellow-800 dark:bg-white dark:rounded-lg mb-6 line-clamp-2">
              {productDetails?.description}
            </p>

            <div className="flex space-x-4 mb-6">
              <Button
                isLoading={addToCartLoading}
                onPress={() => {
                  {
                    isLoggedIn
                      ? addProductToCart(
                          productDetails?._id,
                          setAddToCartLoading
                        )
                      : loginFrist();
                  }
                }}
                className="bg-red-600 dark:bg-black dark:text-yellow-400 flex gap-2 items-center text-white px-6 py-2 rounded-md hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-yellow-700 focus:ring-offset-2"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
                  />
                </svg>
                Add to Cart
              </Button>
              <Button
                isLoading={addToWishListLoading}
                onPress={() => {
                  {
                    isLoggedIn ? handleAddToWishlist() : loginFrist();
                  }
                }}
                href="#"
                className={` mx-auto  bg-gray-200 flex gap-2 items-center text-gray-800 px-5 py-2.5 text-center text-sm font-medium rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2
               ${
                 addedToWishlist ? (
                   <i className="fa-solid fa-heart text-red-500 text-lg"></i>
                 ) : (
                   <i className="fa-solid fa-heart text-red"></i>
                 )
               }`}
              >
                <i
                  className={`fa-solid fa-heart mr-2 h-6 w-6 ${
                    addedToWishlist ? "text-red-500" : "text-white"
                  }`}
                ></i>
                Wishlist
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

import { button, Button } from "@heroui/react";
import React, { useEffect, useState } from "react";
import { removeCartItem, updateProductCuount } from "../../services/secvices";
import "animate.css"
export default function CartProduct({
  product,
  setCartId,
  setCartData,
  setNumOfCartItems,
}) {
  const [isLoading, setIsLoading] = useState(false);
  const [productCount, setProductCount] = useState(product.count);
  const [incrementLoading, setIncrementLoading] = useState(false);
  const [decrementLoading, setDecrementLoading] = useState(false);

  useEffect(() => {
    setProductCount(product.count);
  }, [product.count]);




  return (
    <>
      <div className=" animate__animated animate__swing animate__slow bg-sky-900 dark:bg-slate-50  flex flex-col p-4 text-lg font-semibold shadow-md border rounded-md">
        <div className="flex  flex-col md:flex-row gap-3 md:justify-between">
          {/* Product Information */}
          <div className="flex flex-row gap-6 items-center">
            <div className="w-28 h-28">
              <img
                className="w-full h-full rounded-lg"
                src={product.product.imageCover}
              />
            </div>
            <div className="flex flex-col gap-1">
              <p className="text-lg text-white dark:text-blue-950 font-semibold">
                {product.product.title.split(" ", 3).join(" ")}
              </p>
              <p className="my-2 text-white dark:text-blue-950 text-sm">
                {" "}
                <span className="font-bold">Category </span>:{" "}
                {product.product.category.name}
              </p>
              <p className=" text-white dark:text-blue-950 text-sm">
                <span className="font-bold">Brand </span>:{" "}
                {product.product.brand.name}
              </p>
            </div>
          </div>
          {/* Price Information */}
          <div className="self-center text-center">
            <p className="text-white dark:text-blue-950 font-normal text-xl">
              ${product.price}
            </p>
            <hr />
            <p className="text-white dark:text-blue-950 font-normal text-sm ">
              total-price: ${product.count * product.price}
            </p>
          </div>
          {/* Remove Product Icon */}
          <div className="self-center  ">
            <Button
              isLoading={isLoading}
              className=" min-w-0 p-2 "
              onPress={() =>
                removeCartItem(
                  product.product._id,
                  setCartId,
                  setCartData,
                  setNumOfCartItems,
                  setIsLoading
                )
              }
              endContent={
                <svg
                  height="24px"
                  strokewidth="1.5"
                  stroke="currentColor"
                  id="Layer_1"
                  version="1.1"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlSpace="preserve"
                  xmlns="http://www.w3.org/2000/svg"
                  xmlnsXlink="http://www.w3.org/1999/xlink"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              }
              color="danger"
            ></Button>
          </div>
        </div>
        {/* Product Quantity */}
        <div className="flex flex-row self-center gap-1">
          <Button
            isDisabled={productCount == 1}
            isLoading={decrementLoading}
            onPress={() => {
              updateProductCuount(
                product.product._id,
                product.count - 1,
                product.count,
                setCartData,
                setNumOfCartItems,
                setIncrementLoading,
                setDecrementLoading
              );
            }}
            className="w-4  self-center rounded-md border text-black dark-text-white border-gray-300"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              className="dark:bg-slate-200"
              stroke="#000"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M5 12h14" />
            </svg>
          </Button>
          <input
            onChange={(e) => {
              setProductCount(e.target.value);
            }}
            onBlur={(e)=>{
             ( e.target.value*1 != product.count) &&
              updateProductCuount(
                product.product._id,
                Number(e.target.value),
                product.count,
                setCartData,
                setNumOfCartItems,
                setIncrementLoading,
                setDecrementLoading
              );
            }}
            type="text"
            value={productCount}
            min={1}
            className="w-8 my-2 h-10 text-center bg-sky-600  text-gray-100 text-sm outline-none border border-gray-100 dark:border-gray-800 rounded-md"
          />
          <Button
            isLoading={incrementLoading}
            onPress={() => {
              updateProductCuount(
                product.product._id,
                product.count + 1,
                product.count,
                setCartData,
                setNumOfCartItems,
                setIncrementLoading,
                setDecrementLoading
              );
            }}
            className="w-4  self-center rounded-md border border-gray-300"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="true"
              className="dark:bg-slate-200"
              stroke="#000"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 5v14M5 12h14" />
            </svg>
          </Button>
        </div>
      </div>
    </>
  );
}

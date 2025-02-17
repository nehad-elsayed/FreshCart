import React, { useEffect, useState } from "react";

import { Button } from "@heroui/react";
import Loading from "../../components/LoadingScreen/Loading";
import CartProduct from "../../components/CartProduct/CartProduct";
import { clearCart, getCart } from "../../services/secvices";
import {  Link, useNavigate } from "react-router-dom";
import 'animate.css'
import { Helmet } from "react-helmet";


export default function Cart() {
  //useSates
  const [cartId, setCartId] = useState(null);
  const [cartData, setCartData] = useState(null);
  const [numOfCartItems, setNumOfCartItems] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingClearCart, setIsLoadingClearCart] = useState(false);
  const navigate = useNavigate();

  //useEffects and Api Calling===>>>>>

  useEffect(() => {
    getCart(setIsLoading, setCartId, setCartData, setNumOfCartItems);
  }, []);

  //js functions===========>>>> some of them  in services foldder//

  // let {data,isError,error,isLoading,isFetching }=useQuery({

  //   queryKey:["checkoutdata"],
  //   queryFn:checkout,
  //   staleTime:100000 ,
  // })

  // console.log(data.)
  function goHome() {
    navigate("/");
  }

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
       <Helmet>
                <title>Cart</title>
                <meta
                    name="description"
                    content="Welcome to our Cart page! Here, you’ll find an extensive range of high-quality items carefully curated for your shopping pleasure."
                />
            </Helmet>
      {numOfCartItems != 0 ? (
        <div className="h-100 bg-slate-200 dark:bg-sky-950 flex flex-col md:flex-row   md:px-14 py-7 mx-auto">
          {/* <!-- My Cart --> */}
          <div className="w-full flex flex-col h-fit gap-4 p-4  ">
            <div className="flex items-center  justify-between">
              <h1 className="p-5 text-[20px] text-center bg-clip-text text-transparent bg-gradient-to-r from-red-400 to-sky-500 dark:bg-clip-text dark:text-transparent dark:bg-gradient-to-r dark:from-sky-200 dark:to-yellow-500 md:text-[40px] my-5 font-bold animate__animated animate__backInRight  ">
                Cart Items ({numOfCartItems})
              </h1>

              <Button
                isLoading={isLoadingClearCart}
                onPress={() =>
                  clearCart(
                    setIsLoadingClearCart,
                    setCartId,
                    setCartData,
                    setNumOfCartItems
                  )
                }
                className="text-red-500 animate__animated animate__bounceInDown animate__delay-2s "
              >
                {" "}
                Clear <i className="text-red-500 fa-solid fa-trash"></i>{" "}
              </Button>
            </div>

            {cartData?.products.map((product, index) => {
              return (
                <CartProduct
                  key={index}
                  product={product}
                  setCartId={setCartId}
                  setCartData={setCartData}
                  setNumOfCartItems={setNumOfCartItems}
                  isLoading={isLoading}
                  setIsLoading={setIsLoading}
                />
              );
            })}
          </div>

          {/* <!-- Purchase Resume --> */}

          <div className=" sticky top-20 flex text-black flex-col w-full md:w-2/3 h-fit gap-4 p-4">
            <p className="p-5 text-center text-[25px] bg-clip-text text-transparent bg-gradient-to-r from-red-400 to-sky-500 dark:bg-clip-text dark:text-transparent dark:bg-gradient-to-r dark:from-sky-200 dark:to-yellow-500 md:text-[40px] my-5 font-bold animate__animated animate__backInRight  ">
              Purchase Resume
            </p>

            <div className=" rounded-lg bg-sky-900 dark:bg-slate-50 flex flex-col p-4 gap-4 text-lg font-semibold shadow-md border ">
              <div className="flex flex-row justify-between">
                <p className="text-white dark:text-black">Subtotal </p>
                <p className="text-end text-white dark:text-black font-bold">
                  ${cartData?.totalCartPrice}
                </p>
              </div>
              <hr className="bg-gray-200 h-0.5" />
              <div className="flex flex-row justify-between">
                <p className="text-white dark:text-black">Shipping</p>
                <div>
                  <p className="text-end text-white dark:text-black font-bold">
                    $3.90
                  </p>
                </div>
              </div>

              <hr className="text-white dark:text-black h-0.5" />
              <div className="flex flex-row justify-between">
                <p className="text-white dark:text-black">
                  Total products Price
                </p>
                <div>
                  <p className="text-end text-white dark:text-black font-bold">
                    ${cartData?.totalCartPrice + 3.9}
                  </p>
                </div>
              </div>
              <div className="flex gap-2 text-white dark:text-black">
                <Link
                  to={"/address/" + cartId}
                  className="animate__animated animate__bounceInDown animate__delay-1s transition-colors text-sm bg-sky-700 hover:bg-sky-600 p-2 rounded-md sm:w-1/4 md:w-1/2 sm:pt-8 text-slate-100 text-hover shadow-md"
                >
                  CheckOut
                </Link>
                <Link
                  to={"/"}
                  className="animate__animated animate__bounceInDown animate__delay-1s transition-colors sm:text-sm  text-center pt-2 bg-slate-400 border  px-2 rounded-md sm:w-1/4 md:w-1/2 text-white  text-hover shadow-md"
                >
                  ADD MORE PRODUCTS
                </Link>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="h-lvh">
          {" "}
          <h2 className=" mt-6 capitalize text-2xl font-bold text-center ">
            {" "}
            <span className="text-red-600">Cart Items (0)</span> No Products in
            your Cart{" "}
          </h2>
          <Button
            className="mt-3 text-red-500"
            onPress={goHome}
            variant="faded"
            isLoading={isLoading}
            color="darger"
          >
            Press here to Return Home <i className="fa-solid fa-house"></i>
          </Button>
        </div>
      )}
    </>
  );
}

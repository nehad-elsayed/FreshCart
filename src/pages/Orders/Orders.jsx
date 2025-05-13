import React, { useEffect, useState } from "react";
import axios from "axios";
import Loading from "../../components/LoadingScreen/Loading";
import { useQuery } from "@tanstack/react-query";
import { formatDate } from "../../helpers/date_helper.js";
import { Helmet } from "react-helmet";

export default function Orders() {
  const [userID, setUserID] = useState();
  useEffect(() => {
    getUserID();
  }, []);

  async function getUserID() {
    const { data } = await axios.get(
      "https://ecommerce.routemisr.com/api/v1/auth/verifyToken",
      {
        headers: {
          token: localStorage.getItem("token"),
        },
      }
    );
    setUserID(data.decoded.id);
  }

  const { data, isError, isLoading, error } = useQuery({
    queryKey: ["Orders"],
    queryFn: () => getUserOrders(userID),
    staleTime: 100000,
  });

  function getUserOrders(userID) {
    return axios.get(
      `https://ecommerce.routemisr.com/api/v1/orders/user/${userID}`
    );
  }

  if (isError) {
    return <h2 className="text-red-500">{error}</h2>;
  }

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      <Helmet>
        <title>AllOrders</title>
        <meta
          name="description"
          content="Welcome to our AllOrders page! Here, you’ll find an extensive range of high-quality items carefully curated for your shopping pleasure."
        />
      </Helmet>
      <section className="min-h-96">
        {data?.data.length !== 0 ? (
          <>
            
            <h1 className="p-10 text-center bg-clip-text text-transparent bg-gradient-to-r from-red-400 to-sky-500 dark:bg-clip-text dark:text-transparent dark:bg-gradient-to-r dark:from-sky-200 dark:to-yellow-500 md:text-[100px] my-5 font-bold animate__animated animate__backInRight  ">
              All Orders
            </h1>
            <div className="md:grid gap-6 min-h-96">
              {data?.data.map((order, index) => {
                return (
                  <div
                    key={index}
                    className="pb-6 mt-5 px-4 md:px-6 mx-auto rounded-lg"
                  >
                    <div className=" item-center justify-start space-y-2 mt-3">
                      <h1 className="text-3xl lg:text-4xl font-semibold leading-7 lg:leading-9  dark:text-gray-100">
                        Order #{order.id}
                      </h1>
                      <p className="text-base font-medium leading-6 dark:text-gray-100">
                        {" "}
                        {formatDate(order.createdAt)}{" "}
                      </p>
                    </div>
                    <div className="mt-10 flex flex-col xl:flex-row justify-center items-stretch  w-full xl:space-x-8 space-y-4 md:space-y-6 xl:space-y-0">
                      <div className="flex flex-col justify-start items-start w-full space-y-4 md:space-y-6 xl:space-y-8">
                        <div className="flex flex-col justify-start items-start bg-gray-100 px-4 py-4 md:py-6 md:p-6 xl:p-8 w-full">
                          <p className="text-lg md:text-xl font-semibold leading-6 xl:leading-5 text-gray-800">
                            Customer’s Cart
                          </p>
                          {order?.cartItems.map((item, index) => {
                            return (
                              <div
                                key={index}
                                className="mt-4 md:mt-6 flex  flex-col md:flex-row justify-start items-start md:items-center md:space-x-6 xl:space-x-8 w-full "
                              >
                                <div className="pb-4">
                                  <img
                                    className=" w-full md:w-[50%] rounded-lg"
                                    src={item.product.imageCover}
                                    alt={item.product.title}
                                  />
                                </div>
                                <div className="border-b border-gray-200 md:flex-row flex-col flex justify-between items-start w-full  pb-8 space-y-4 md:space-y-0">
                                  <div className="w-full flex flex-col justify-start items-start space-y-8">
                                    <h3 className="text-xl xl:text-3xl font-semibold leading-6 text-gray-800">
                                      {item.product.title
                                        .split(" ", 2)
                                        .join(" ")}
                                    </h3>
                                    <div className="flex justify-start items-start flex-col space-y-5">
                                      <p className="text-sm leading-none text-gray-800">
                                        <span className="text-black font-bold italic">
                                          Category :{" "}
                                          {item.product.category.name}{" "}
                                        </span>
                                      </p>
                                      <p className="text-sm leading-none text-gray-800">
                                        <span className="text-black font-bold italic">
                                          Brand : 
                                        </span>
                                      </p>
                                    </div>
                                  </div>
                                  <div className="flex justify-between space-x-8 items-start w-full">
                                    <p className="text-black xl:text-lg leading-6">
                                      ${item.price}{" "}
                                      <span className="text-red-300 line-through">
                                        {" "}
                                        {item.price + 200}
                                      </span>
                                    </p>
                                    <p className="text-base xl:text-lg leading-6 text-gray-800">
                                      {item.count}
                                    </p>
                                    <p className="text-base xl:text-lg font-semibold leading-6 text-black">
                                      ${item.price * item.count}
                                    </p>
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                        <div className="flex justify-center md:flex-row flex-col items-stretch w-full space-y-4 md:space-y-0 md:space-x-6 xl:space-x-8">
                          <div className="flex flex-col px-4 py-6 md:p-6 xl:p-8 w-full bg-gray-50 space-y-6   ">
                            <h3 className="text-xl font-semibold leading-5 text-gray-800">
                              Summary
                            </h3>
                            <div className="flex justify-center items-center w-full space-y-4 flex-col border-gray-200 border-b pb-4">
                              <div className="flex justify-between  w-full">
                                <p className="text-base leading-4 text-gray-800">
                                  Subtotal
                                </p>
                                <p className="text-base leading-4 text-gray-600">
                                  ${order.totalOrderPrice}
                                </p>
                              </div>
                              <div className="flex justify-between items-center w-full">
                                <p className="text-base leading-4 text-gray-800">
                                  Discount{" "}
                                  <span className="bg-gray-200 p-1 text-xs font-medium leading-3  text-gray-800">
                                    STUDENT
                                  </span>
                                </p>
                                <p className="text-base leading-4 text-gray-600">
                                  -$28.00 (50%)
                                </p>
                              </div>
                              <div className="flex justify-between items-center w-full">
                                <p className="text-base leading-4 text-gray-800">
                                  Shipping
                                </p>
                                <p className="text-base leading-4 text-gray-600">
                                  $8.00
                                </p>
                              </div>
                            </div>
                            <div className="flex justify-between items-center w-full">
                              <p className="text-base font-semibold leading-4 text-gray-800">
                                Total
                              </p>
                              <p className="text-base font-semibold leading-4 text-gray-600">
                                ${order.totalOrderPrice}
                              </p>
                            </div>
                          </div>
                          <div className="flex flex-col justify-center px-4 py-6 md:p-6 xl:p-8 w-full bg-gray-50 space-y-6   ">
                            <h3 className="text-xl font-semibold leading-5 text-gray-800">
                              Shipping
                            </h3>
                            <div className="flex justify-between items-start w-full">
                              <div className="flex justify-center items-center space-x-4">
                                <div className="w-8 h-8">
                                  <img
                                    className="w-full h-full"
                                    alt="logo"
                                    src="https://i.ibb.co/L8KSdNQ/image-3.png"
                                  />
                                </div>
                                <div className="flex flex-col justify-start items-center">
                                  <p className="text-lg leading-6 font-semibold text-gray-800">
                                    DPD Delivery
                                    <br />
                                    <span className="font-normal">
                                      Delivery with 24 Hours
                                    </span>
                                  </p>
                                </div>
                              </div>
                              <p className="text-lg font-semibold leading-6 text-gray-800">
                                $8.00
                              </p>
                            </div>
                            <div className="w-full flex justify-center items-center">
                              <button className="hover:bg-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 py-5 w-96 md:w-full bg-gray-800 text-base font-medium leading-4 text-white">
                                View Carrier Details
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        ) : (
         <div className="h-lvh flex items-center justify-center ">
           <h3 className="text-red-500 font-bold text-4xl capitalize p-5 ">
            No orders yet !!
          </h3>
         </div>
        )}
      </section>
    </>
  );
}

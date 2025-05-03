import React from "react";
import style from "./Categories.module.css";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../components/LoadingScreen/Loading";
import { Button } from "@heroui/react";
import "animate.css";
import { Helmet } from "react-helmet";

export default function Categories() {
  function getCategories() {
    return axios.get("https://ecommerce.routemisr.com/api/v1/categories");
  }

  const { data, isError, error, isLoading, isFetching, refetch } = useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
    select: (res) => res?.data?.data,
    staleTime: 100000,
    // gcTime:5000,
    // refetchInterval: 5000,
    // refetchIntervalInBackground:true,
  });

  if (isError) {
    return <h3 className="text-red-600">there is error : {error}</h3>;
  }

  if (isLoading) {
    return <Loading />;
  }
  return (
    <>
      <Helmet>
        <title>Categories</title>
        <meta
          name="description"
          content="Welcome to our Categories page! Here, you’ll find an extensive range of high-quality items carefully curated for your shopping pleasure."
        />
      </Helmet>
      <section className="min-h-96">
        {/* <Button
          isLoading={isFetching}
          onPress={refetch}
          className="my-4 dark:bg-sky-800"
        >
          {" "}
          <i className="fa-solid fa-rotate-right"></i>{" "}
        </Button> */}

        <div className="container p-5">
          <h1 className="p-10 mb-3 text-center bg-clip-text text-transparent bg-gradient-to-r from-red-400 to-sky-500 dark:bg-clip-text dark:text-transparent dark:bg-gradient-to-r dark:from-sky-200 dark:to-yellow-500 md:text-[70px] my-5 font-bold animate__animated animate__backInRight  ">
            All Categories
          </h1>
          <div className="grid mt-5 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {data?.map((category, index) => {
              return (
                <div
                  key={index}
                  className="p-3 bg-slate-200 rounded-lg flex flex-col justify-between"
                >
                  <img
                    className=" rounded-lg min-h-[90%]"
                    src={category.image}
                  />
                  <h2 className="p-1 animate__animated animate__bounceInDown   text-lg font-bold bg-white dark:bg-sky-900 text-black dark:text-slate-100 rounded-md">
                    {category.name.split(" ", 2).join(" ")}
                  </h2>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}

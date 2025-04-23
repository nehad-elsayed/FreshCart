import React from "react";
import style from "./Brands.module.css";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../components/LoadingScreen/Loading";
import { Button } from "@heroui/react";
import "animate.css"
import { Helmet } from "react-helmet";
export default function Brands() {
  function getBrands() {
    return axios.get("https://ecommerce.routemisr.com/api/v1/brands");
  }

  const { data, isError, error, isLoading, isFetching, refetch } = useQuery({
    queryKey: ["brandsData"],
    queryFn: getBrands,
    select: (data) => data?.data,
    staleTime: 100000,
  });


  if (isError) {
    return <h3 className="text-red-500"> Error is : {error} </h3>;
  }

  if (isLoading) {
    return <Loading />;
  }
  return (
    <>
      <Helmet>
                <title>Brands</title>
                <meta
                    name="description"
                    content="Welcome to our Brands page! Here, you’ll find an extensive range of high-quality items carefully curated for your shopping pleasure."
                />
            </Helmet>
      <section>
        {/* <Button
          isLoading={isFetching}
          onPress={refetch}
          className=" dark:bg-sky-800 m-2"
        >
          {" "}
          <i className="fa-solid fa-rotate-right"></i>{" "}
        </Button> */}

        <div className="container bg-slate-200 dark:bg-transparent p-5 min-h-96">
          <h1 className="p-10 text-center bg-clip-text text-transparent bg-gradient-to-r from-red-400 to-sky-500 dark:bg-clip-text dark:text-transparent dark:bg-gradient-to-r dark:from-sky-200 dark:to-yellow-500 md:text-[100px] my-5 font-bold animate__animated animate__backInRight  ">
            All Brands
          </h1>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {data?.data.map((brand, index) => {
              return (
               
                  <img
                  key={index}
                    className=" mx-auto min-h-[200px] rounded-lg"
                    src={brand.image}
                  />
               
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}

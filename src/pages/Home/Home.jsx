// import React, { useEffect, useState } from "react";
// import style from "./Home.module.css";
import axios from "axios";
import Loading from "../../components/LoadingScreen/Loading";
import Product from "../../components/Product/Product";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@heroui/react";
import { Helmet } from "react-helmet";
import "animate.css";
import HomeSilder from "../../components/HomeSlider/HomeSlider";
import CategoriesSlider from "../../components/CategoriesSlider/CategoriesSlider";

export default function Home() {
  // const [products, setProducts] = useState([]);
  // const [isLoadingProducts, setIsLoadingProducts] = useState(true);


  function getProducts() {
    return axios.get("https://ecommerce.routemisr.com/api/v1/products");
  }

  let { data, isError, error, isFetching, refetch, isLoading } = useQuery({
    queryKey: ["HomeProducts"], //any name // we use it if we want to use the same data at any component
    queryFn: getProducts, //the ref of the fun which calling api
    staleTime: 500000, //after it ends a new fetch will happen
    gcTime: 10000,
    // retry: 2,
    // retryDelay: 2000,
    // refetchInterval:3000,
    // refetchIntervalInBackground: true , //defult true
    //  refetchOnWindowFocus: true, // should use staleTime with it // its the oppisite of interval background
  });


  if (isError) {
    return <h3>{error}</h3>;
  }

  if (isLoading) {
    return <Loading />;
  }

  // useEffect(() => {
  //   getProducts();
  // }, []);

  // async function getProducts() {
  //   setIsLoading(true);
  //   let {
  //     data: { data },
  //   } = await axios.get("https://ecommerce.routemisr.com/api/v1/products");
  //   console.log(data);
  //   setProducts(data);
  //   setIsLoading(false);
  // }

  // if (isLoadingProducts) {
  //   return <Loading />;
  // }



  return (
    <>
      <Helmet>
        <title>Home</title>
        <meta
          name="description"
          content="Welcome to FreshCart, where shopping meets convenience! Our sleek and user-friendly e-commerce platform is designed to enhance your online shopping experience. "
        />
      </Helmet>
      <section>

      <h1 className="p-10 lg:block hidden text-center bg-clip-text text-transparent bg-gradient-to-r from-red-400 to-sky-500 dark:bg-clip-text dark:text-transparent dark:bg-gradient-to-r dark:from-sky-200 dark:to-yellow-500 md:text-[100px] my-5 font-bold animate__animated animate__delay-1s animate_slow animate__backInDown">
          Welcome To Our Site
        </h1>
        <div className=" flex flex-col gap-4 mt-1">
          <HomeSilder />
          <CategoriesSlider />
        </div>
      
        {/* <Button
          isLoading={isFetching}
          onPress={refetch}
          className="my-4 dark:bg-sky-800"
        >
          {" "}
          <i className="fa-solid fa-rotate-right"></i>{" "}
        </Button> */}
        <div className="container grid  sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8  dark:bg-sky-950 p-5">
          {data?.data?.data.map((product, index) => {
            return <Product product={product} key={index} />;
          })}
        </div>
      </section>
    </>
  );
}

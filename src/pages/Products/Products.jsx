import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  decrement,
  increment,
  increaseByAmount,
} from "../../redux/counterSlice";
import Product from "../../components/Product/Product";
import { getAllProducts } from "../../redux/productsSlice";
import Loading from "../../components/LoadingScreen/Loading";
import { Helmet } from "react-helmet";
import {Button, Input} from "@heroui/react";
import { useFormik } from "formik";
import axios from "axios";


export default function Products() {
  const dispatch = useDispatch();


  const { products,isLoading } = useSelector((store) => {
    return store.products;
  });

  useEffect(() => {
    dispatch(getAllProducts());
  }, []);

 const initialValues ={
    searchData:""
  }

async function getproductsForSearch(){
  const {data} = await axios.get("https://ecommerce.routemisr.com/api/v1/products")
  console.log(data)
}


const {values,handleChange,handleSubmit}= useFormik({
  initialValues,
  onSubmit: getproductsForSearch
})



if (isLoading){
  return <Loading/>
}

  return (
    <>
     <Helmet>
                <title>Products</title>
                <meta
                    name="description"
                    content="Welcome to our Products page! Here, you’ll find an extensive range of high-quality items carefully curated for your shopping pleasure."
                />
            </Helmet>
     <section className="min-h-96">
     <div >
      

        <h1 className="p-4 md:p-10 capitalize text-center bg-clip-text text-transparent bg-gradient-to-r from-red-400 to-sky-500 dark:bg-clip-text dark:text-transparent dark:bg-gradient-to-r dark:from-sky-200 dark:to-yellow-500 md:text-[100px] md:my-5 font-bold animate__animated animate__backInLeft">
          check our products{" "}
        </h1>

         
        <form onSubmit={handleSubmit} className="w-[80%] mx-auto md:w-[60%] flex items-center justify-center gap-2 ">
        <Input label="Search Products"  placeholder="Enter Product.."   onChange={handleChange}  type="search" variant="flat" />
        <Button type="submit" variant="faded" onPress={getproductsForSearch} >Search</Button>
        </form>
        
        
      

        <div className="container grid  sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8  dark:bg-sky-950 p-5">
          {products?.map((product, index) => {
            return <Product product={product} key={index} />;
          })}
        </div>
      </div>
     </section>
    </>
  );
}

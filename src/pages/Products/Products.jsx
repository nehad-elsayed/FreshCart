import { Button } from "@heroui/react";
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


export default function Products() {
  const dispatch = useDispatch();

  // const { counter}=useSelector((store)=>{
  //     return store.counter
  // })
  // console.log(counter)

  const { products,isLoading } = useSelector((store) => {
    return store.products;
  });
  console.log(products);

  useEffect(() => {
    dispatch(getAllProducts());
  }, []);


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
        {/* <h1 className='text-red-700 text-4xl font-bold'>Check our Products</h1> 
      <Button variant='faded' color='success' className='text-2xl' onPress={()=>{dispatch(increment())}}>+</Button>
      <span  className='text-3xl text-red-500 font-bold m-2'>{counter}</span> 
      <Button variant='faded' color='warning' className='text-2xl' onPress={()=>{dispatch(decrement())}}>-</Button>
      <Button variant='faded' color='info' className='text-2xl' onPress={()=>{dispatch(increaseByAmount(5))}}>+++++</Button> */}

        <h1 className="p-4 md:p-10 capitalize text-center bg-clip-text text-transparent bg-gradient-to-r from-red-400 to-sky-500 dark:bg-clip-text dark:text-transparent dark:bg-gradient-to-r dark:from-sky-200 dark:to-yellow-500 md:text-[100px] md:my-5 font-bold animate__animated animate__backInLeft">
          check our products{" "}
        </h1>

        <div className="container grid  sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8  dark:bg-sky-950 p-5">
          {products.map((product, index) => {
            return <Product product={product} key={index} />;
          })}
        </div>
      </div>
     </section>
    </>
  );
}

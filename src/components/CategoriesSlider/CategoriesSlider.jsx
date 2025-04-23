import React, { useState } from 'react'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import Loading from '../LoadingScreen/Loading';


export default function CategoriesSlider() {
 const[allCategories,setAllCategories]=useState(null)

function getCategories(){
  return axios.get("https://ecommerce.routemisr.com/api/v1/categories")
}
    
const{data,isFetching,isLoading ,isError,error,refetch}=useQuery({

  queryKey:["categories"],
  queryFn:getCategories,
  select: (res) => res?.data?.data,
  staleTime:50000,
  gcTime:10000,
})



  var settings = {
    dots: false,
    infinite: true,
    speed: 300,
    slidesToShow: 6,
    slidesToScroll: 4,
  };



return (
<>
<Slider className='cursor-grab' autoplay {...settings}>

{data?.map((category, index) => {
              return (
                <div className='' key={category._id}>
                
                 <img src={category.image} className='w-[70px] md:w-full h-28 md:h-80' alt="" />
                 <h3 className='my-3 font-bold text-[7px] mx-2 md:text-xl text-black dark:text-slate-200'>{category.name}</h3>
                
               </div>
              );
            })}

  {/* <div>
   {
    <img src={img1} className='w-full h-80' alt="" />
   }
  </div>
  <div>
  <img src={img2} className='w-full h-80' alt="" />

  </div>
  <div>
  <img src={img3} className='w-full h-80' alt="" />

  </div>
  <div>
  <img src={img4} className='w-full h-80' alt="" />

  </div> */}
 
</Slider>



</>
)
}

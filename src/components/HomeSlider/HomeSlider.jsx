import React from 'react'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import img1 from "../../assets/images/grocery-banner-2.jpeg"
import img2 from "../../assets/images/blog-img-2.jpeg"
import img3 from "../../assets/images/grocery-banner.png"
import img4 from "../../assets/images/banner-4.jpeg"
import img5 from "../../assets/images/product1.jpg"
import img6 from "../../assets/images/product3.jpg"
import { div } from 'framer-motion/client';
export default function HomeSlider() {


    var settings = {
        dots: false,
        infinite: true,
        speed: 300,
        slidesToShow: 1,
        slidesToScroll: 1,
      };
     


  return (
    <>
    <div className=' flex'>
   

<div className='w-1/2 md:w-3/4'>
<Slider className=' cursor-grab' autoplay  {...settings}>
      <div>
       {
        <div>
           <img src={img1} className='w-[200px] block md:w-full h-40 md:h-80' alt="" />
           
        </div>
       

       }
      </div>
      <div>
      <img src={img2} className='w-[200px] block md:w-full h-40 md:h-80' alt="" />
      


      </div>
      <div>
      <img src={img3} className='w-[200px] block md:w-full h-40 md:h-80' alt="" />
      
      </div>


      <div>
      <img src={img4} className='w-[200px] block md:w-full h-40 md:h-80' alt="" />
      

      </div>
     
    </Slider>
</div>
<div className='w-1/2 md:w-1/4'>

<img src={img5} className=' block w-full h-40' alt="" />
<img src={img6} className=' block w-full h-40' alt="" />
</div>

    </div>
  
  

    </>
  )
}

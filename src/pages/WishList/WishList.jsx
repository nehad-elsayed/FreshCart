
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { useState } from "react";
import Loading from "../../components/LoadingScreen/Loading";
import WishListProduct from "../../components/WishListProduct/WishListProduct";
import { useNavigate } from "react-router-dom";
import { Button } from "@heroui/react";
import { Helmet } from "react-helmet";

export default function Wishlist() {
  const [wishlistData, setWishlistData] = useState(null);
  const navigate = useNavigate();
  function getWishListProducts() {
    return axios.get("https://ecommerce.routemisr.com/api/v1/wishlist", {
      headers: {
        token: localStorage.getItem("token"),
      },
    });
  }

  const { data, error, isError,  isLoading, refetch } = useQuery({
    queryKey: ["wishlist"],
    queryFn: getWishListProducts,
    select: (res) => res.data.data,
  });

  console.log(data);
  // setWishlistData(data)

  function goHome() {
    navigate("/");
  }

  if (isError) {
    return <h3>{error}</h3>;
  }
  if (isLoading) {
    return <Loading />;
  }
  return (
    <>
      <Helmet>
        <title>ًWishList</title>
        <meta
          name="description"
          content="Welcome to our Products page! Here, you’ll find an extensive range of high-quality items carefully curated for your shopping pleasure."
        />
      </Helmet>
      <h1 className="text-lg md:text-3xl py-4">
        Your WishList <i className="fa-solid fa-heart text-red-500"></i>{" "}
      </h1>

      <div className="grid md:grid-cols-4 gap-3 p-5 min-h-96">
        {data.length != 0 ? (
          data.map((product, index) => {
            return (
              <WishListProduct
                product={product}
                key={index}
                refetch={refetch}
                setWishlistData={setWishlistData}
              />
            );
          })
        ) : (
          <div className="text-center h-96 col-span-4">
            <h2 className="text-red-500  text-center font-bold text-lg md:text-4xl">
              Sorry !! No Products in Your Wish List
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
        )}{" "}
      </div>
    </>
  );
}




// import { useQuery } from "@tanstack/react-query";
// import axios from "axios";
// import React, { useEffect, useState } from "react";
// import Loading from "../../components/LoadingScreen/Loading";
// import WishListProduct from "../../components/WishListProduct/WishListProduct";
// import { useNavigate } from "react-router-dom";
// import { Button } from "@heroui/react";
// import { Helmet } from "react-helmet";
// // import {getWishListProducts} from "../../services/secvices"



// export default function Wishlist() {
//   const [wishlistData, setWishlistData] = useState(null);
//   const[wishLoading,setWishLoading]=useState(true)
//     const [isLoading, setIsLoading] = useState(false);
  
// const navigate=useNavigate()


// async function getWishListProducts() {
//   setWishLoading(true)
//   const { data }= await axios.get("https://ecommerce.routemisr.com/api/v1/wishlist", {
//       headers: {
//         token: localStorage.getItem("token"),
//       },
//     });
// setWishLoading(false)
// console.log(data?.data)
// setWishlistData(data.data)
//   }

// useEffect(()=>{
//   getWishListProducts ()
// },[])

// console.log(wishlistData)

//   function goHome() {
//     navigate("/");
//   }


//   if (wishLoading) {
//     return <Loading />;
//   }
//   return (
//     <>
//      <Helmet>
//                 <title>WishList</title>
//                 <meta
//                     name="description"
//                     content="Welcome to our WishList page! Here, you’ll find an extensive range of high-quality items carefully curated for your shopping pleasure."
//                 />
//             </Helmet>
//         <h1 className="text-lg md:text-3xl py-4">Your WishList <i className="fa-solid fa-heart text-red-500"></i> </h1>

//       <div className="grid md:grid-cols-4 gap-5 p-5 min-h-96">
//         {wishlistData.length != 0 ? (
//          wishlistData.map((product, index) => {
//             return (
//              <WishListProduct product={product} key={index} wishListData={wishlistData}  setWishlistData={setWishlistData} />
//             );
//           })
//         ) : (
// <div className="text-center h-96 col-span-4">
// <h2 className="text-red-500  text-center text-lg md:text-4xl">Sorry !! No Product in Your Wish List</h2>
// <Button
//             className="mt-3 text-red-500"
//             onPress={goHome}
//             variant="faded"
//             isLoading={isLoading}
//             color="darger"
//           >
//             Press here to Return Home <i className="fa-solid fa-house"></i>
//           </Button>
// </div>        )}{" "}
//       </div>
    
//     </>
//   );
// }

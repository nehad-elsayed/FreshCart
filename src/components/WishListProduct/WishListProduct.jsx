import React, { useEffect, useState } from "react";
import { addProductToCart, removeWishListItem } from "../../services/secvices";
import { Card, CardHeader, CardBody, Image } from "@heroui/react";
import { Button, CardFooter } from "@heroui/react";
import axios from "axios";

export default function WishListProduct({ product, setWishlistData, refetch }) {
  const [addToCartLoading, setAddToCartLoading] = useState(false);
  const [isLoadingWish, setIsLoadingWish] = useState(false);
  const [productID, setProductID] = useState();

  const [wishlist, setWishlist] = useState([]);
  const [isInWishlist, setIsInWishlist] = useState(false);

  // useEffect(() => {
  //   const fetchWishlist = async (productId) => {
  //     try {
  //       const response = await axios.get(
  //         `https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`);
  //       setWishlist(response.data.data);
  //       setProductID(response.data.data.product._id)

  //     } catch (error) {
  //       console.error("Error fetching wishlist", error);
  //     }
  //   };

  //   fetchWishlist();
  // }, []);
  // useEffect(() => {
  //   setIsInWishlist(wishlist.some((item) => item.id == productID));
  // }, [wishlist, productID]);

  return (
    <>
      <Card className="py-4 bg-black text-white dark:bg-slate-200 dark:text-sky-900">
        <CardHeader className="pb-0 pt-2 px-4 flex flex-col text-center items-center justify-center">
          <p className="text-tiny uppercase font-bold">${product.price}</p>
          <small className="">{product.brand.name}</small>
          <h4 className="font-bold text-large">
            {" "}
            {product.title.split(" ", 3).join(" ")}
          </h4>
        </CardHeader>
        <CardBody className="overflow-visible py-2">
          <Image
            alt="wishlist background"
            className="object-cover rounded-xl text-center mx-auto w-full"
            src={product.imageCover}
          />
        </CardBody>
        <CardFooter className="gap-2">
          <Button
            isLoading={addToCartLoading}
            onPress={() => addProductToCart(product._id, setAddToCartLoading)}
            className="w-full hover:opacity-90 flex items-center mx-auto justify-center rounded-md bg-red-900 dark:bg-slate-600 dark:text-white px-5 py-2 text-center text-sm font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-blue-300 animate__animated animate__bounceInDown animate__delay-1s animate__slow "
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="mr-2 h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
            Add to cart
          </Button>
          <hr />

          <Button
            onPress={() =>
              removeWishListItem(
                product._id,
                setIsLoadingWish,
                setWishlistData,
                refetch
              )
            }
            isLoading={isLoadingWish}
            className=" min-w-0 p-2 "
            endContent={
              <span
                style={{
                  color: isInWishlist ? "red" : "gray",
                  fontSize: "24px",
                }}
              >
                ❤️
              </span>
            }
            color="transparent"
          ></Button>
        </CardFooter>
      </Card>
    </>
  );
}

// import React, { useEffect, useState } from "react";
// import { addProductToCart, removeWishListItem } from "../../services/secvices";
// import { Card, CardHeader, CardBody, Image } from "@heroui/react";
// import { Button, CardFooter } from "@heroui/react";

// export default function WishListProduct({
//   product,
//   setWishlistData,
//   refetch
// }) {
//   const [addToCartLoading, setAddToCartLoading] = useState(false);
//     const [productId, setProductId] = useState(product._id);
//   const [isLoadingWish, setIsLoadingWish] = useState(false);

//   // useEffect(() => {
//   //   setWishlistData(data);
//   // }, [wishlistData]);

//   return (
//     <>
//       <Card className="py-4 bg-black text-white dark:bg-slate-200 dark:text-sky-900">
//         <CardHeader className="pb-0 pt-2 px-4 flex flex-col text-center items-center justify-center">
//           <p className="text-tiny uppercase font-bold">${product.price}</p>
//           <small className="">{product.brand.name}</small>
//           <h4 className="font-bold text-large">
//             {" "}
//             {product.title.split(" ", 3).join(" ")}
//           </h4>
//         </CardHeader>
//         <CardBody className="overflow-visible py-2">
//           <Image
//             alt="wishlist background"
//             className="object-cover rounded-xl text-center mx-auto w-full"
//             src={product.imageCover}
//           />
//         </CardBody>
//         <CardFooter className="gap-2">
//           <Button
//             isLoading={addToCartLoading}
//             onPress={() => addProductToCart(product._id, setAddToCartLoading)}
//             className="w-full hover:opacity-90 flex items-center mx-auto justify-center rounded-md bg-red-900 dark:bg-slate-600 dark:text-white px-5 py-2 text-center text-sm font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-blue-300 animate__animated animate__bounceInDown animate__delay-1s animate__slow "
//           >
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               className="mr-2 h-6 w-6"
//               fill="none"
//               viewBox="0 0 24 24"
//               stroke="currentColor"
//               strokeWidth={2}
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
//               />
//             </svg>
//             Add to cart
//           </Button>
//           <hr />

//           <Button
//             onPress={() =>
//             removeWishListItem(product._id, setIsLoadingWish, setWishlistData)}
//             isLoading={isLoadingWish}
//             className=" min-w-0 p-2 "
//             endContent={
//               <span>
//                 <i className="fa-solid fa-heart text-red-500"></i>
//               </span>
//             }
//             color="transparent"
//           ></Button>
//         </CardFooter>
//       </Card>
//     </>
//   );
// }

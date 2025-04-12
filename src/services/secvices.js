import axios from "axios";
import { data } from "react-router-dom";
import { Bounce, toast } from "react-toastify";

//**********important Note**********//
//we can't use any hooks here so we will recieve the (setAddToCartLoading) as parameter from Product Component and ProductDatails Component
//  and from any component will use this function =>
//  we will make use state on it and take the parameter we want here from this use state
//  which has [addToCartLoading,setAddToCartLoading]

export async function addProductToCart(productId, setAddToCartLoading) {
  setAddToCartLoading(true);
  const { data } = await axios.post(
    "https://ecommerce.routemisr.com/api/v1/cart",
    {
      productId, //we removed the value because it matches the key
    },
    {
      headers: {
        token: localStorage.getItem("token"),
      },
    }
  );

  setAddToCartLoading(false);
  toast.success(data.message, {
    position: "bottom-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
    transition: Bounce,
  });
}

export async function getCart(
  setIsLoading,
  setCartId,
  setCartData,
  setNumOfCartItems
) {
  setIsLoading(true);
  const { data } = await axios.get(
    "https://ecommerce.routemisr.com/api/v1/cart",
    {
      headers: {
        token: localStorage.getItem("token"),
      },
    }
  );
  setIsLoading(false);
  setCartId(data.cartId);
  setCartData(data.data);
  setNumOfCartItems(data.numOfCartItems);
}

export async function removeCartItem(
  productId,
  setCartId,
  setCartData,
  setNumOfCartItems,
  setIsLoading
) {
  setIsLoading(true);
  const { data } = await axios.delete(
    `https://ecommerce.routemisr.com/api/v1/cart/${productId}`,

    {
      headers: {
        token: localStorage.getItem("token"),
      },
    }
  );
  setIsLoading(false);
  setCartId(data.cartId);
  setCartData(data.data);
  setNumOfCartItems(data.numOfCartItems);
}

export async function clearCart(
  setIsLoading,
  setCartId,
  setCartData,
  setNumOfCartItems
) {
  setIsLoading(true);
  const { data } = await axios.delete(
    "https://ecommerce.routemisr.com/api/v1/cart",
    {
      headers: {
        token: localStorage.getItem("token"),
      },
    }
  );
  setIsLoading(false);
  setCartId(null);
  setCartData(null);
  setNumOfCartItems(0);
}

export async function updateProductCuount(
  productId,
  count,
  currentCount,
  setCartData,
  setNumOfCartItems,
  setIncrementLoading,
  setDecrementLoading
) {
  if (currentCount > count) {
    setDecrementLoading(true);
  }
  if (currentCount < count) {
    setIncrementLoading(true);
  }

  const { data } = await axios.put(
    `https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
    {
      count,
    },
    {
      headers: {
        token: localStorage.getItem("token"),
      },
    }
  )(data);
  setDecrementLoading(false);
  setIncrementLoading(false);
  setCartData(data.data);
  setNumOfCartItems(data.numOfCartItems);
}

// https://ecommerce.routemisr.com/api/v1/wishlist
export async function addProductToWishList(productId, setAddToWishListLoading) {
  setAddToWishListLoading(true);
  const { data } = await axios.post(
    "https://ecommerce.routemisr.com/api/v1/wishlist",
    {
      productId, //we removed the value because it matches the key
    },
    {
      headers: {
        token: localStorage.getItem("token"),
      },
    }
  );
  setAddToWishListLoading(false);
  toast.success(data.message, {
    position: "top-center",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
    transition: Bounce,
  });

  data;
}

export async function removeWishListItem(
  productId,
  setIsLoadingWish,
  setWishlistData,
  refetch
) {
  setIsLoadingWish(true);
  const { data } = await axios.delete(
    `https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`,

    {
      headers: {
        token: localStorage.getItem("token"),
      },
    }
  );
  setIsLoadingWish(false);
  data;
  // setWishlistData(data)
  refetch();
  toast.success("product removed successfully from your wishlist", {
    position: "top-center",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
    transition: Bounce,
  });
}

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./pages/Layout/Layout";
import Home from "./pages/Home/Home";
import Register from "./pages/Register/Register";
import Signin from "./pages/Signin/Signin";
import NotFound from "./pages/NotFound/NotFound";
import Categories from "./pages/Categories/Categories";
import Brands from "./pages/Brands/Brands";
import Cart from "./pages/Cart/Cart";
import AuthContextProvider from "./contexts/authContext";
import ProtectedRoute from "./protectedRoutes/ProtectedRoute";
import ProtectedAuthRoute from "./protectedRoutes/ProtectedAuthRoute";
import ProductDetails from "./pages/ProductDetails/ProductDetails";
import { ToastContainer } from "react-toastify";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import Orders from "./pages/Orders/Orders";
import Address from "./pages/Address/Address";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import Products from "./pages/Products/Products";
import Wishlist from "./pages/Wishlist/Wishlist";
import ForgotPassword from "./pages/ForgotPassword/ForgotPassword";
import VerifyCode from "./pages/VerifyCode/VerifyCode";
import ResetPassword from "./pages/ResetPassword/ResetPassword";
import UserProvider from "./contexts/User.context";
// import WishList from "./pages/Wishlist/Wishlist";


let query = new QueryClient();

let router = createBrowserRouter([
  {
    path: "",
    element: <Layout />,
    children: [
      {
        index: true,
        element: (
          <ProtectedRoute>
            <Home />{" "}
          </ProtectedRoute>
        ),
      },
      {
        path: "/register",
        element: (
          <ProtectedAuthRoute>
            <Register />
          </ProtectedAuthRoute>
        ),
      },
      {
        path: "/signin",
        element: (
          <ProtectedAuthRoute>
            <Signin />
          </ProtectedAuthRoute>
        ),
      },
      {
        path: "/categories",
        element: (
          <ProtectedRoute>
            {" "}
            <Categories />
          </ProtectedRoute>
        ),
      },
      {
        path: "/brands",
        element: (
          <ProtectedRoute>
            <Brands />
          </ProtectedRoute>
        ),
      },
      {
        path: "/products",
        element: (
          <ProtectedRoute>
            <Products />
          </ProtectedRoute>
        ),
      },
      {
        path: "/forgotpassword",
        element: (
         
            <ForgotPassword />
         
        ),
      },
      {
        path: "/verifyCode",
        element: <VerifyCode />,
      },
       { path: "/resetpassword",
        element: <ResetPassword />,
      },
      
      {
        path: "/cart",
        element: (
          <ProtectedRoute>
            {" "}
            <Cart />
          </ProtectedRoute>
        ),
      },
      {
        path: "/wishlist",
        element: (
          <ProtectedRoute>
            {" "}
            <Wishlist />
          </ProtectedRoute>
        ),
      },
     
      {
        path: "/productDetails/:id",
        element: (
          <ProtectedRoute>
            <ProductDetails />
          </ProtectedRoute>
        ),
      },
      {
        path: "/allorders",
        element: (
          <ProtectedRoute>
            {" "}
            <Orders />{" "}
          </ProtectedRoute>
        ),
      },
      {
        path: "/address/:cartId",
        element: (
          <ProtectedRoute>
            {" "}
            <Address />{" "}
          </ProtectedRoute>
        ),
      },
      { path: "*", element: <NotFound /> },
    ],
  },
]);

function App() {
  return (
    <>

    <Provider store={store}>
    <AuthContextProvider>
        <QueryClientProvider client={query}>
          <UserProvider>
          <RouterProvider router={router}></RouterProvider>
          <ReactQueryDevtools />
          </UserProvider>
        </QueryClientProvider>
        <ToastContainer />
      </AuthContextProvider>
    </Provider>
      
    </>
  );
}

export default App;

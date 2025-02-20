import { Formik, useFormik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { Helmet } from "react-helmet";
import { Button, Input } from "@heroui/react";
import { useState } from "react";


export default function ForgotPassword() {
  // let toastId;
  const [isLoading,setIsLoading]=useState(false)

  const navigate = useNavigate();

  function clearInputs() {
    Formik.values.email = "";
  }


  async function onSubmit(values) {
    try {

      setIsLoading(true)
      const options = {
        method: "POST",
        url: "https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords",
        data: values,
      };
      // toastId = toast.loading("Waiting...");

      const { data } = await axios.request(options);
      if (data.statusMsg == "success") {
        localStorage.setItem("userResetEmail", values.email);
        // toast.dismiss(toastId);
        // toast(data.message, {
        //   duration: 2000,
        //   position: "top-center",
        //   icon: (
        //     <span className="bg-primary size-1 p-3 rounded-full flex justify-center items-center">
        //       <i className="fa-solid fa-check text-white"></i>
        //     </span>
        //   ),
        // });
        setIsLoading(false)
        navigate("/verifyCode");
      }
    } catch (error) {
      clearInputs();
      // toast.dismiss(toastId);
      // toast.error(error.response.data.message);
    }
  }


const formik = useFormik({
  initialValues: {
    email: "",
  },
  onSubmit,
});

return <>
     <Helmet>
                <title>ForgotPassword</title>
                <meta
                    name="description"
                    content="Welcome to our ResetPAssword page! Here, you’ll find an extensive range of high-quality items carefully curated for your shopping pleasure."
                />
            </Helmet>
    <section className="flex flex-col justify-center items-center gap-8 mt-12 h-96">
      <header className="flex flex-col gap-4 text-center">
        <h2 className="font-bold text-green-600 dark:text-yellow-600 text-2xl">
          Forgot your password?
        </h2>
        <p className="text-gray-500 text-sm">
          Your password will be reset by email.
        </p>
      </header>
      <form onSubmit={formik.handleSubmit}>
        <label
          className="text-left text-xs font-bold text-gray-600"
          htmlFor="email"
        >
          Enter your email address
        </label>
        <div className="mt-1 mb-5">
          <Input
            autoComplete="off"
            id="email"
            type="email"
            name="email"
            className=""
            value={formik.values.email}
            onChange={formik.handleChange}
          />
        </div>
        <footer className="text-center">
          <Button  isLoading={isLoading} type="submit" className="btn-primary block mx-auto py-1">
            Next
          </Button>
          <Link
            className="text-xs text-green-600 dark:text-yellow-600 font-bold inline-block mt-4 hover:underline"
            to="/signin"
          >
            Back to log in
          </Link>
        </footer>
      </form>
    </section>
  </>
}

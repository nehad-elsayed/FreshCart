import React, { useContext, useState } from "react";
import { Input } from "@heroui/input";
import { Button } from "@heroui/react";
import { useFormik } from "formik";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { authContext } from "../../contexts/authContext";
import "animate.css";
import { Helmet } from "react-helmet";
// import cookies from "cookies";

export default function SignIn() {
  const [isLoading, setIsloading] = useState(false);
  const navigate = useNavigate();
  const [errMsg, setErrMsg] = useState("");
  const { setIsLoggedIn } = useContext(authContext); // we need the method  set is logged in  so we destructed it only
  //use formik is a hook from formik
  const validationSchema = Yup.object({
    email: Yup.string()
      .required("email is required")
      .email("email is invalid")
      .matches(
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/i,
        "Invalid email address"
      ),
    password: Yup.string()
      .required("password is required")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        "Invalid paassword"
      ),
  });

  const initialValues = {
    email: "",
    password: "",
  };

  function onSubmit() {
    setIsloading(true);
    setErrMsg("");
    axios
      .post("https://ecommerce.routemisr.com/api/v1/auth/signin", values)
      .then(({ data }) => {
        if (data.message == "success") {
          localStorage.setItem("token", data.token);
          setIsLoggedIn(true);
          navigate("/");
        }
      })
      .catch((err) => {
        setErrMsg(err.response.data.message);
      })
      .finally(() => {
        setIsloading(false);
      });
  }

  const { handleSubmit, values, handleChange, errors, touched, handleBlur } =
    useFormik({
      initialValues,
      onSubmit,
      // validate,
      validationSchema,
    });

  return (
    <>
      <Helmet>
        <title>Login</title>
        <meta
          name="description"
          content="Welcome to our Products page! Here, you’ll find an extensive range of high-quality items carefully curated for your shopping pleasure."
        />
      </Helmet>

      <form onSubmit={handleSubmit}>
        <div className="w-11/12 sm:w-[50%] py-20 mx-auto grid gap-4">
          <div className="">
            {" "}
            <Input
              isInvalid={errors.email && touched.email}
              errorMessage={errors.email}
              onBlur={handleBlur}
              value={values.email}
              onChange={handleChange}
              variant="faded"
              label="Email"
              type="email"
              name="email"
            />
          </div>
          <div>
            <Input
              isInvalid={errors.password && touched.password}
              errorMessage={errors.password}
              onBlur={handleBlur}
              value={values.password}
              onChange={handleChange}
              variant="faded"
              label="Password"
              type="password"
              name="password"
            />
          </div>
          <Button
            type="submit"
            variant="shadow"
            className=" animate__animated  animate__backInUp animate-slow text-white bg-slate-600 dark:bg-sky-800"
            isLoading={isLoading}
          >
            Login
          </Button>
          {errMsg && (
            <p className="  text-red-500 bg-red-100 dark:bg-transparent dark:text-yellow-500 w-fit mx-auto p-2 rounded">
              {errMsg}
            </p>
          )}{" "}
          <Link to={"/forgotpassword"} className=" underline  text-small ">
            Forgot Password
          </Link>{" "}
          <Link
            to={"/register"}
            className="text-slate-600 font-bold dark:text-sky-500 text-sm lg:text-medium"
          >
            Create New Account
          </Link>{" "}
        </div>
      </form>
    </>
  );
}

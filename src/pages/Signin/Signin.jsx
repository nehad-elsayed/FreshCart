import React, { useContext, useState } from "react";
import { Input } from "@heroui/input";
import { Button } from "@heroui/react";
import { useFormik } from "formik";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { authContext } from "../../contexts/authContext";
import "animate.css";
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

  // function validate() {
  //   const errors = {};

  //   //email validation
  //   if (values.email == "") {
  //     errors.email = "Email is Required";
  //   } else if (
  //     !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/i.test(values.email)
  //   ) {
  //     errors.email = "Email is Invalid";
  //   }

  //   //password validation
  //   if (values.password == "") {
  //     errors.password = "Password is Required";
  //   }

  //   return errors;
  // }

  const initialValues = {
    name: "",
    email: "",
    password: "",
    rePassword: "",
    phone: "",
  };

  function onSubmit() {
    setIsloading(true);
    setErrMsg("");
    axios
      .post("https://ecommerce.routemisr.com/api/v1/auth/signin", values)
      .then(({ data }) => {
        console.log(data.message);
        if (data.message == "success") {
          localStorage.setItem("token", data.token);
          // cookies.set("token", data.token);

          setIsLoggedIn(true);
          navigate("/");
        }
      })
      .catch((err) => {
        console.log(err.response.data.message);
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
            className=" animate__animated animate__delay-1s animate__backInUp animate-slow text-white bg-green-600 dark:bg-sky-800"
            isLoading={isLoading}
          >
            Login
          </Button>
          {errMsg && (
            <p className="text-red-400 font-semibold bg-red-100 w-fit mx-auto p-2 rounded">
              {errMsg}
            </p>
          )}{" "}
          <Link
            to={"/forgotpassword"}
            className=" underline font-bold text-lg md:text-2xl"
          >
            Forgot Password
          </Link>{" "}
          <Link
            to={"/register"}
            className="text-green-600 font-bold dark:text-sky-500 text-lg md:text-2xl"
          >
            Create New Account
          </Link>{" "}
        </div>
      </form>
    </>
  );
}

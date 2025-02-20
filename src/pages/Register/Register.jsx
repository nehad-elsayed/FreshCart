import React, { useState } from "react";
import style from "./Register.module.css";
import { Input } from "@heroui/input";
import { Button } from "@heroui/react";
import { useFormik } from "formik";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import "animate.css"
import { Helmet } from "react-helmet";

export default function Register() {
  const [isLoading, setIsloading] = useState(false);
  const navigate = useNavigate();
  const [errMsg, setErrMsg] = useState("");
  //use formik is a hook from formik

  const validationSchema = Yup.object({
    name: Yup.string()
      .required("name is required")
      .min(3, "name must be at least 3 characters")
      .max(20, "name must be less than 20 character"),
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
    rePassword: Yup.string()
      .required("rePassword is required")
      .oneOf([Yup.ref("password")]),
    phone: Yup.string()
      .required("phone is required")
      .matches(/^(\+20|0)?1[0125]\d{8}$/, "Invalid phone number"),
  });

 
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
      .post("https://ecommerce.routemisr.com/api/v1/auth/signup", values)
      .then(({ data }) => {
        console.log(data.message);
        if (data.message == "success") {
          navigate("/signin");
        }
        console.log(data.message);
      })
      .catch((err) => {
        console.error(err.response.data.message);
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
      // validate, //we remove validate and replace it with validation schema
      validationSchema,
    });

  return (
    <>
    <Helmet>
        <title>SignUp</title>
        <meta
          name="description"
          content="Welcome to our Products page! Here, you’ll find an extensive range of high-quality items carefully curated for your shopping pleasure."
        />
      </Helmet>
      <form onSubmit={handleSubmit}>
        <div className="w-11/12 sm:w-2/3 py-20 mx-auto grid md:grid-cols-2 gap-4">
          <div className="md:col-span-2">
            {" "}
            <Input
              isInvalid={errors.name && touched.name}
              errorMessage={errors.name}
              onBlur={handleBlur}
              value={values.name}
              onChange={handleChange}
              variant="faded"
              label="Name"
              type="text"
              name="name"
            />
          </div>
          <div className="md:col-span-2">
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
          <div>
            {" "}
            <Input
              isInvalid={errors.rePassword && touched.rePassword}
              errorMessage={errors.rePassword}
              onBlur={handleBlur}
              value={values.rePassword}
              onChange={handleChange}
              variant="faded"
              label="Repassword"
              type="password"
              name="rePassword"
            />
          </div>

          <div className="md:col-span-2">
            <Input
              isInvalid={errors.phone && touched.phone}
              errorMessage={errors.phone}
              onBlur={handleBlur}
              value={values.phone}
              onChange={handleChange}
              variant="faded"
              label="PhoneNum"
              type="tel"
              name="phone"
            />
          </div>

          <Button
            type="submit"
            variant="shadow"
            className="animate__animated animate__delay-1s animate__backInUp animate-slow md:col-span-2 text-white bg-green-600 dark:bg-sky-700 dark:text-white"
            isLoading={isLoading}
          >
            Register
          </Button>
          {errMsg && (
            <p className="text-red-400 font-semibold text-center md:col-span-2 w-1/2 capitalize text-2xl mx-auto bg-red-100  p-2 rounded">
              {errMsg}
            </p>
          )}
        </div>
      </form>
    </>
  );
}

import React, { useState } from "react";
import { Input } from "@heroui/input";
import { Button } from "@heroui/react";
import { useFormik } from "formik";
import axios from "axios";
import {  useParams } from "react-router-dom";
import * as Yup from "yup";


export default function Address() {
  const [isLoading, setIsloading] = useState(false);
  const {cartId}=useParams()
  //use formik is a hook from formik

  const validationSchema = Yup.object({
    details: Yup.string()
      .required("details is required")
     ,
    phone: Yup.string()
      .required("phone is required")
      .matches(/^(\+20|0)?1[0125]\d{8}$/, "Invalid phone number"),
      city: Yup.string()
      .required("city is required")
  });


  const initialValues = {
    details: "",
    phone: "",
    city: "",

  };

  
   async function checkout (){
    setIsloading(true)
      const{data}=await axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}`,
        {
          shippingAddress: values
        },{
          headers:{
            token: localStorage.getItem("token")
          },
          params:{
            url: "http://localhost:5173"
          }
        }
  
      )

      localStorage.setItem("userAddresses", cartId)
      setIsloading(false)
      console.log(data)
      window.location.href= data?.session.url
  
    }

  const { handleSubmit, values, handleChange, errors, touched, handleBlur } =
    useFormik({
      initialValues,
      onSubmit: checkout,
      // validate, //we remove validate and replace it with validation schema
      validationSchema,
    });

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="w-11/12 sm:w-2/3 py-20 mx-auto grid md:grid-cols-2 gap-4">
          <div className="md:col-span-2">
            {" "}
            <Input
              isInvalid={errors.details && touched.details}
              errorMessage={errors.details}
              onBlur={handleBlur}
              value={values.details}
              onChange={handleChange}
              variant="faded"
              label="Address"
              type="text"
              name="details"
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

          <div className="md:col-span-2">
            <Input
              isInvalid={errors.city && touched.city}
              errorMessage={errors.city}
              onBlur={handleBlur}
              value={values.city}
              onChange={handleChange}
              variant="faded"
              label="City"
              type="text"
              name="city"
            />
          </div>

          <Button
            type="submit"
            variant="shadow"
            className="md:col-span-2 text-white bg-green-600 dark:bg-sky-700 dark:text-white"
            isLoading={isLoading}
          >
            Make Order
          </Button>
         
        </div>
      </form>
    </>
  );
}

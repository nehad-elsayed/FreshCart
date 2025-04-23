// import React, {  useState } from "react";
// import { Input } from "@heroui/input";
// import { Button } from "@heroui/react";
// import { useFormik } from "formik";
// import axios from "axios";
// import { Link, useNavigate } from "react-router-dom";
// import * as Yup from "yup";
// import "animate.css";

// export default function ResetPassword() {
//   const [isLoading, setIsloading] = useState(false);
//   const navigate = useNavigate();
//   const [errMsg, setErrMsg] = useState("");

//   const validationSchema = Yup.object({
//     email: Yup.string()
//       .required("email is required")
//       .email("email is invalid")
//       .matches(
//         /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/i,
//         "Invalid email address"
//       ),
//     newPassword: Yup.string()
//       .required("password is required")
//       .matches(
//         /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
//         "Invalid paassword"
//       ),
//   });

//   const initialValues = {
//     email: "",
//     newPassword: "",
//   };

//   async function callResetPassword(values) {
//     try {
//       setIsloading(true)

//       let { data } = await axios.put(
//         "https://ecommerce.routemisr.com/api/v1/auth/resetPassword",
//         values
//       );
//       console.log(data);
//       setIsloading(false)
//       localStorage.setItem("token", data.token);
//       navigate("/");
//     } catch (error) {

//       console.log(error);
//       setErrMsg(error)
//     }
//   }

//   const { handleSubmit, values, handleChange, errors, touched, handleBlur } =
//     useFormik({
//       initialValues,
//       onSubmit: callResetPassword,
//       validationSchema,
//     });

//   return (
//     <>
//       <form onSubmit={handleSubmit}>
//         <div className="w-11/12 sm:w-[50%] py-20 mx-auto grid gap-4">
//           <div className="">
//             {" "}
//             <Input
//               isInvalid={errors.email && touched.email}
//               errorMessage={errors.email}
//               onBlur={handleBlur}
//               value={values.email}
//               onChange={handleChange}
//               variant="faded"
//               label="Email"
//               type="email"
//               name="email"
//             />
//           </div>
//           <div>
//             <Input
//               isInvalid={errors.newPassword && touched.newPassword}
//               errorMessage={errors.newPassword}
//               onBlur={handleBlur}
//               value={values.newPassword}
//               onChange={handleChange}
//               variant="faded"
//               label="newPassword"
//               type="password"
//               name="newPassword"
//             />
//           </div>
//           <Button
//             type="submit"
//             variant="shadow"
//             className=" animate__animated  animate__backInUp animate-slow text-white bg-green-600 dark:bg-sky-800"
//             isLoading={isLoading}
//           >
//             Login
//           </Button>
//           {errMsg && (
//             <p className="text-red-400 font-semibold bg-red-100 w-fit mx-auto p-2 rounded">
//               {errMsg}
//             </p>
//           )}{" "}
//         </div>
//       </form>
//     </>
//   );
// }

//Rightttt

import axios from "axios";
import { useFormik } from "formik";
import { useContext, useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { Helmet } from "react-helmet";
import useChangePasswordType from "../../Hooks/useChangePasswordType";
import { userContext } from "../../contexts/User.context";
import { Button, Input } from "@heroui/react";

export default function ResetPassword() {
  const[isLoading , setIsLoading]=useState(false)
  const { setToken, token } = useContext(userContext);
  let { changePasswordType, setChangePasswordType } = useChangePasswordType();

  let navigate = useNavigate();

  async function formSubmit(values) {
    let toastId;

    try {
      setIsLoading(true)
      const options = {
        method: "PUT",
        url: "https://ecommerce.routemisr.com/api/v1/auth/resetPassword",
        data: {
          email: localStorage.getItem("userResetEmail"),
          newPassword: formik.values.newPassword,
        },
      };
      toastId = toast.loading("Waiting...");

      const { data } = await axios.request(options);

      localStorage.setItem("token", data.token);
      setToken(localStorage.getItem("token"));
      toast.dismiss(toastId);

      toast(
        <span className="text-darkPrimary ">
          Password Changed Successfully
        </span>,
        {
          duration: 2000,
          position: "top-center",
          icon: (
            <span className="bg-primary size-1 p-3 rounded-full flex justify-center items-center">
              <i className="fa-solid fa-check text-white"></i>
            </span>
          ),
        }
      );
      setIsLoading(false)

      navigate("/signin");
    } catch (error) {
      console.log(error);
      toast.dismiss(toastId);
      toast.error(error.response.data.message);
    }
  }

  const formValidation = Yup.object({
    newPassword: Yup.string()
      .required("password is required")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        "Invalid paassword"
      ),
    rePassword: Yup.string()
      .required("Confirm Password is required")
      .oneOf([Yup.ref("newPassword")], "Confirm Password is invalid"),
  });

  const formik = useFormik({
    initialValues: {
      newPassword: "",
      rePassword: "",
    },

    validationSchema: formValidation,

    onSubmit: formSubmit,
  });

  return (
    <>
      <Helmet>
        <title>ResetPassword</title>
        <meta
          name="description"
          content="Welcome to our ResetPassword page! Here, you’ll find an extensive range of high-quality items carefully curated for your shopping pleasure."
        />
      </Helmet>
      <section className="h-lvh flex flex-col justify-center items-center gap-8 mt-1">
        <header className="flex flex-col gap-4 text-center">
          <h2 className="font-extrabold text-primary text-2xl">
            Create New password
          </h2>
          <p className="text-gray-500 text-sm">
            This password should be different from the <br />
            previous password.
          </p>
        </header>
        <form onSubmit={formik.handleSubmit}>
          <div className="mb-3 relative">
            <Input
              className="p-2 w-full placeholder:text-sm"
              autoComplete="off"
              type={`${changePasswordType ? "text" : "password"}`}
              name="newPassword"
              value={formik.values.newPassword}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="New Password"
            />

            {changePasswordType ? (
              <i
                onClick={() => {
                  setChangePasswordType(!changePasswordType);
                }}
                className="fa-regular text-slate-400 cursor-pointer fa-eye absolute top-1/2 right-[15px] text-xs -translate-y-1/2"
              ></i>
            ) : (
              <i
                onClick={() => {
                  setChangePasswordType(!changePasswordType);
                }}
                className="fa-regular text-slate-400 cursor-pointer fa-eye-slash absolute top-1/2 right-[15px] text-xs -translate-y-1/2"
              ></i>
            )}
          </div>
          {formik.errors.newPassword && formik.touched.newPassword && (
            <p className="text-red-600 font-bold text-sm my-2">
              *{formik.errors.newPassword}
            </p>
          )}
          <div className="mb-3">
            <Input
              className="p-2 w-full placeholder:text-sm"
              autoComplete="off"
              type={`${changePasswordType ? "text" : "password"}`}
              name="rePassword"
              value={formik.values.rePassword}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="Confirm Password"
            />
          </div>
          {formik.errors.rePassword && formik.touched.rePassword && (
            <p className="text-red-600 font-bold text-sm my-2">
              *{formik.errors.rePassword}
            </p>
          )}
          <footer className="text-center">
            <Button color="warning" isLoading={isLoading} type="submit" className=" block mx-auto ">
              Reset Password
            </Button>
            <Link
              className="text-xs text-primary font-bold inline-block mt-4 hover:underline"
              to="/signin"
            >
              Back to log in
            </Link>
          </footer>
        </form>
      </section>
    </>
  );
}

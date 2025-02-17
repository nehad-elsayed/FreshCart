import React from "react";
import style from "./NotFound.module.css";

export default function NotFound() {
  return (
    <>
      <section className="h-lvh flex justify-center items-center">
        <div className="container">
          <h1 className="text-5xl dark:text-red-600">NotFound</h1>
          <h2 className="text-3xl my-3 dark:text-red-600">Error404!</h2>
        </div>
      </section>
    </>
  );
}

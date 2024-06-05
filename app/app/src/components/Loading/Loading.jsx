import React from "react";
import style from "./Loading.module.css";

const Loading = () => {
  return (
    <section className={style.wrapper}>
      <span className={style.loading__text}>Loading</span>

      <div className={style.loading__container}>
        <span className={style.circle}></span>
        <span className={style.circle}></span>
        <span className={style.circle}></span>
        <span className={style.circle}></span>
      </div>
    </section>
  );
};

export default Loading;

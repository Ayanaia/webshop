import React from "react";
import style from "./NoResults.module.css";

const Noresults = () => {
  return (
    <section className={style.wrapper}>
      <h1 className={style.title}>Sorry! No Pokémon was found.</h1>
    </section>
  );
};

export default Noresults;

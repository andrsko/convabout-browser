import React from "react";
import styles from "./Loader.module.css";

export const Loader = (props) => {
  const wrapperClassName = [
    styles.wrapper,
    styles[props.size],
    props.compact && styles.compact,
  ].join(" ");

  const loaderClassName = [
    styles.loader,
    styles[props.size],
    props.compact && styles.compact,
  ].join(" ");

  return (
    <div className={wrapperClassName}>
      <div className={loaderClassName}></div>
    </div>
  );
};

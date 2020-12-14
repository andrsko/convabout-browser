import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import styles from "./SignUpErrorHandler.module.css";

export const SignUpErrorHandler = () => {
  const [displaySignUpError, setDisplaySignUpError] = useState(false);

  const signUpStatus = useSelector((state) => state.auth.signUpStatus);
  const signUpError = useSelector((state) => state.auth.signUpError);

  useEffect(() => {
    if (!signUpStatus === "failed") {
      setDisplaySignUpError(false);
      return;
    }
    setDisplaySignUpError(true);
    const timer = setTimeout(() => {
      setDisplaySignUpError(false);
    }, 7000);
    return () => clearTimeout(timer);
  }, [signUpStatus]);

  const content =
    signUpStatus === "failed" && displaySignUpError ? (
      <p className={"error " + styles.signUpError}>
        {"Failed to sign up: " +
          (signUpError
            ? signUpError
            : "user with such username already exists")}
      </p>
    ) : null;

  return <div>{content}</div>;
};

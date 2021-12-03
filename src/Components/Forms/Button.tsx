import React, { ReactNode } from "react";
import styles from "./Button.module.css";

type ButtonProps = {
  children: ReactNode | string;
  disabled?: boolean;
};

const Button = ({ children, ...props }: ButtonProps) => {
  return (
    <button {...props} className={styles.button}>
      {children}
    </button>
  );
};

export default Button;

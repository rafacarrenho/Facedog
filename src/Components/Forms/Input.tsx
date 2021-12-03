import React, { ChangeEvent } from "react";
import styles from "./Input.module.css";

type InputProps = {
  label?: string;
  type?: string;
  name?: string;
  value?: string;
  onChange?: (value: ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  onBlur?: () => void;
};

const Input = ({
  label,
  type,
  name,
  value,
  onChange,
  error,
  onBlur,
}: InputProps) => {
  return (
    <div className={styles.wrapper}>
      <label htmlFor={name} className={styles.label}>
        {label}
      </label>
      <input
        id={name}
        name={name}
        className={styles.input}
        type={type}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
      />
      {error && <p className={styles.error}> {error}</p>}
    </div>
  );
};

export default Input;

import React from "react";
import styles from "./Input.module.css";

export default function Input({
  id,
  type = "text",
  value,
  placeholder,
  onChange,
  ...props
}) {
  return (
    <input
      id={id}
      type={type}
      value={value}
      placeholder={placeholder}
      onChange={onChange}
      className={styles.input}
      {...props}
    />
  );
}

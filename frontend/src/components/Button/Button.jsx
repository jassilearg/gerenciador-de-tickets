import React from "react";
import Styles from "./Button.module.css";

export default function Botao({
  children,
  isLoading = false,
  type = "button",
  disabled = false,
  ...props
}) {
  return (
    <button
      className={Styles.primary}
      type={type}
      disabled={isLoading || disabled}
      {...props}
    >
      {isLoading ? "Carregando..." : children}
    </button>
  );
}

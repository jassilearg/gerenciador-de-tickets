import React from "react";
import ButtonStyles from "./Button.module.css";

export default function Botao({
  color,
  children,
  isLoading = false,
  type = "button",
  disabled = false,
  ...props
}) {
  let className = "";

  if (color === "primary") {
    className = ButtonStyles.primary;
  } else if (color === "secondary") {
    className = ButtonStyles.secondary;
  }

  return (
    <button
      className={className}
      type={type}
      disabled={isLoading || disabled}
      {...props}
    >
      {isLoading ? "Carregando..." : children}
    </button>
  );
}

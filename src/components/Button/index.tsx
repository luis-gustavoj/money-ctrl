import { ButtonHTMLAttributes } from "react";

import "./styles.scss";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

export const Button = ({ ...props }: ButtonProps) => {
  return <button {...props} />;
};

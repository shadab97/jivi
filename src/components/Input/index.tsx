import { Fragment, ReactNode } from "react";
import Slider from "./Slider";
import Text from "./Text";
import Date from "./Date";
import Select from "./Select";

interface InputProps {
  children: ReactNode;
}

const Input = ({ children }: InputProps) => {
  return <Fragment>{children}</Fragment>;
};

Input.Slider = Slider;
Input.Text = Text;
Input.Date = Date;
Input.Select = Select;

export default Input;

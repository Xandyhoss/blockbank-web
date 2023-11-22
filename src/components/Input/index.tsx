import React, { InputHTMLAttributes, useState } from "react";
import "./input.css";
import { FieldError } from "react-hook-form";
import classNames from "classnames";
import InputErrorMessage from "../InputErrorMessage";

interface InputPropTypes extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  type?: string;
  placeholder: string;
  errors?: FieldError;
}

const Input = React.forwardRef<HTMLInputElement, InputPropTypes>(
  ({ label, type = "text", errors, ...rest }, ref) => {
    const [inputText, setInputText] = useState("");

    return (
      <div className="flex flex-col gap-2">
        {label && (
          <label
            className={classNames("input-label", {
              "input-label-active": inputText !== "",
            })}
            htmlFor={rest.name}
          >
            {label}
          </label>
        )}
        <input
          id={rest.name}
          className={classNames("input-field", { error: errors?.message })}
          type={type}
          {...rest}
          onChange={(e) => {
            rest.onChange?.(e);
            setInputText(e.target.value);
          }}
          ref={ref}
        />
        <InputErrorMessage errors={errors} />
      </div>
    );
  }
);

export default Input;

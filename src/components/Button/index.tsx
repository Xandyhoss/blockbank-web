import { ButtonHTMLAttributes } from "react";
import "./button.css";
import classNames from "classnames";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  title: string;
  variant?: "primary" | "secondary";
  icon?: string;
  submitting?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  title,
  variant = "primary",
  icon,
  className,
  submitting,
  ...rest
}) => {
  return (
    <button
      type="button"
      className={classNames("button", variant, className, { submitting })}
      disabled={submitting}
      {...rest}
    >
      {submitting && (
        <div className={classNames("overlay")}>
          <i className="fas fa-spinner" />
        </div>
      )}
      {icon && <i className={icon} />}
      {title}
    </button>
  );
};

export default Button;

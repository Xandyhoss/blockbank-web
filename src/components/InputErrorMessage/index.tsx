import { FieldError } from "react-hook-form";
import "./inputError.css";

interface InputErroProps {
  errors?: FieldError;
}

const InputErrorMessage: React.FC<InputErroProps> = ({ errors }) => {
  return (
    <>
      {errors?.message && (
        <div className="field-error">
          <i className="fas fa-times-circle" />
          {errors.message}
        </div>
      )}
    </>
  );
};

export default InputErrorMessage;

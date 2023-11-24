import { useForm } from "react-hook-form";
import Input from "../../components/Input";
import Button from "../../components/Button";
import { useLocation, useNavigate } from "react-router-dom";
import { updateCreditCardLimit } from "../../services/CreditCard";
import { useEffect } from "react";

const UpdateCreditCardLimit: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<UpdateCreditCardLimitPayload>();
  const navigate = useNavigate();

  const { state } = useLocation();

  useEffect(() => {
    if (state === null) {
      navigate("/holders");
    }
  }, [navigate, state]);

  const updateLimitSubmit = async (data: UpdateCreditCardLimitPayload) => {
    const response = await updateCreditCardLimit({
      ...data,
      creditCardKey: state.creditCardKey,
    });
    if (response) {
      navigate(`/holders/manage/${state.holderKey}`);
      return;
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <i className="fas fa-credit-card" />
          <h2 className="text-2xl">Update credit card limit</h2>
        </div>
      </div>
      <form
        className="p-4 gap-4 grid grid-cols-2"
        onSubmit={handleSubmit(updateLimitSubmit)}
      >
        <Input
          label="Updated limit"
          placeholder="Updated limit"
          {...register("value", {
            required: "Required field",
          })}
          errors={errors.value}
        />
        <Button
          className="col-start-2 row-start-2 justify-self-end"
          type="submit"
          title="Update limit"
          icon="fas fa-credit-card"
          submitting={isSubmitting}
        />
      </form>
    </div>
  );
};

export default UpdateCreditCardLimit;

import { useForm } from "react-hook-form";
import Input from "../../components/Input";
import Button from "../../components/Button";
import { useLocation, useNavigate } from "react-router-dom";
import { updateCreditCardName } from "../../services/CreditCard";
import { useEffect } from "react";

const UpdateCreditCardName: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<UpdateCreditCardNamePayload>();
  const navigate = useNavigate();

  const { state } = useLocation();

  useEffect(() => {
    if (state === null) {
      navigate("/holders");
    }
  }, [navigate, state]);

  const updateCreditCardNameSubmit = async (
    data: UpdateCreditCardNamePayload
  ) => {
    const response = await updateCreditCardName({
      ...data,
      creditCardKey: state.creditCardKey,
    });
    if (response) {
      navigate("/creditCard");
      return;
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <i className="fas fa-arrows-spin" />
          <h2 className="text-2xl">Update credit card name</h2>
        </div>
      </div>
      <form
        className="p-4 gap-4 grid grid-cols-2"
        onSubmit={handleSubmit(updateCreditCardNameSubmit)}
      >
        <Input
          label="New Credit Card Name"
          placeholder="New Credit Card Name"
          {...register("name", {
            required: "Required field",
          })}
          errors={errors.name}
        />
        <Button
          className="col-start-2 row-start-2 justify-self-end"
          type="submit"
          title="Update credit card name"
          icon="fas fa-arrows-spin"
          submitting={isSubmitting}
        />
      </form>
    </div>
  );
};

export default UpdateCreditCardName;

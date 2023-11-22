import { useForm } from "react-hook-form";
import Input from "../../components/Input";
import Button from "../../components/Button";
import { useLocation, useNavigate } from "react-router-dom";
import { createNewCreditCardPurchase } from "../../services/CreditCard";
import { useEffect } from "react";

const CreateCreditCardPurchase: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CreateCreditCardPurchasePayload>();
  const navigate = useNavigate();
  const { state } = useLocation();

  useEffect(() => {
    if (state === null) {
      navigate("/creditCard");
    }
  }, [navigate, state]);

  const createTransferencySubmit = async (
    data: CreateCreditCardPurchasePayload
  ) => {
    const response = await createNewCreditCardPurchase({
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
          <i className="fas fa-dollar-sign" />
          <h2 className="text-2xl">Create credit card purchase</h2>
        </div>
      </div>
      <form
        className="p-4 gap-4 grid grid-cols-2"
        onSubmit={handleSubmit(createTransferencySubmit)}
      >
        <Input
          label="Purchase description"
          placeholder="Purchase description"
          step={0.01}
          {...register("description", {
            required: "Required field",
          })}
          errors={errors.description}
        />
        <Input
          label="Purchase value"
          placeholder="Purchase value"
          type="number"
          step={0.01}
          {...register("value", {
            required: "Required field",
            valueAsNumber: true,
          })}
          errors={errors.value}
        />
        <Button
          className="col-start-2 row-start-2 justify-self-end"
          type="submit"
          title="Create purchase"
          icon="fas fa-dollar-sign"
          submitting={isSubmitting}
        />
      </form>
    </div>
  );
};

export default CreateCreditCardPurchase;

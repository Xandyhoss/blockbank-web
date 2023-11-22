import { useForm } from "react-hook-form";
import Input from "../../components/Input";
import Button from "../../components/Button";
import { useNavigate } from "react-router-dom";
import { createCreditCard } from "../../services/CreditCard";

const CreditCardCreate: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CreateCreditCardPayload>();
  const navigate = useNavigate();

  const createCreditCardSubmit = async (data: CreateCreditCardPayload) => {
    const response = await createCreditCard(data);
    if (response) {
      navigate("/creditCard");
      return;
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <i className="fas fa-credit-card" />
          <h2 className="text-2xl">Create credit card</h2>
        </div>
      </div>
      <form
        className="p-4 gap-4 grid grid-cols-2"
        onSubmit={handleSubmit(createCreditCardSubmit)}
      >
        <Input
          label="Credit Card Name"
          placeholder="Credit Card Name"
          {...register("creditCardName", {
            required: "Required field",
          })}
          errors={errors.creditCardName}
        />
        <Button
          className="col-start-2 row-start-2 justify-self-end"
          type="submit"
          title="Create credit card"
          icon="fas fa-plus"
          submitting={isSubmitting}
        />
      </form>
    </div>
  );
};

export default CreditCardCreate;

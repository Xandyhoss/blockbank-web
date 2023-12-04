import { useForm } from "react-hook-form";
import Input from "../../components/Input";
import Button from "../../components/Button";
import { useNavigate } from "react-router-dom";
import { createNewPurchase } from "../../services/Purchases";

const MakePurchase: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CreatePurchasePayload>();
  const navigate = useNavigate();

  const createPurchaseSubmit = async (data: CreatePurchasePayload) => {
    const response = await createNewPurchase(data);
    if (response) {
      navigate("/");
      return;
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <i className="fas fa-dollar=sign" />
          <h2 className="text-2xl">Make purchase</h2>
        </div>
      </div>
      <form
        className="p-4 gap-4 grid grid-cols-2"
        onSubmit={handleSubmit(createPurchaseSubmit)}
      >
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
         <Input
          label="Purchase description"
          placeholder="Purchase description"
          {...register("description", {
            required: "Required field",
          })}
          errors={errors.description}
        />
        <Button
          className="col-start-2 row-start-2 justify-self-end"
          type="submit"
          title="Make purchase"
          icon="fas fa-dollar-sign"
          submitting={isSubmitting}
        />
      </form>
    </div>
  );
};

export default MakePurchase;

import { useForm } from "react-hook-form";
import Input from "../../components/Input";
import Button from "../../components/Button";
import { useNavigate } from "react-router-dom";
import { createNewTransferency } from "../../services/Transfers";

const CreateTransferency: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<MakeTransferPayload>();
  const navigate = useNavigate();

  const createTransferencySubmit = async (data: MakeTransferPayload) => {
    const response = await createNewTransferency(data);
    if (response) {
      navigate("/");
      return;
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <i className="fas fa-money-bill-transfer" />
          <h2 className="text-2xl">Create transferency</h2>
        </div>
      </div>
      <form
        className="p-4 gap-4 grid grid-cols-2"
        onSubmit={handleSubmit(createTransferencySubmit)}
      >
        <Input
          label="Receiver key"
          placeholder="Receiver key"
          step={0.01}
          {...register("receiverKey", {
            required: "Required field",
          })}
          errors={errors.value}
        />
        <Input
          label="Trasnferency value"
          placeholder="Transferency value"
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
          title="Create transferency"
          icon="fas fa-money-bill-transfer"
          submitting={isSubmitting}
        />
      </form>
    </div>
  );
};

export default CreateTransferency;

import { useForm } from "react-hook-form";
import Input from "../../components/Input";
import Button from "../../components/Button";
import { useNavigate } from "react-router-dom";
import { createNewDeposit } from "../../services/Deposit";

const MakeDeposit: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<MakeDepositPayload>();
  const navigate = useNavigate();

  const createDepositSubmit = async (data: MakeDepositPayload) => {
    const response = await createNewDeposit(data);
    if (response) {
      navigate("/");
      return;
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <i className="fas fa-down-long" />
          <h2 className="text-2xl">Make deposit</h2>
        </div>
      </div>
      <form
        className="p-4 gap-4 grid grid-cols-2"
        onSubmit={handleSubmit(createDepositSubmit)}
      >
        <Input
          label="Deposit value"
          placeholder="Deposit value"
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
          title="Make deposit"
          icon="fas fa-down-long"
          submitting={isSubmitting}
        />
      </form>
    </div>
  );
};

export default MakeDeposit;

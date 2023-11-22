import { useForm } from "react-hook-form";
import Input from "../../components/Input";
import Button from "../../components/Button";
import { useNavigate } from "react-router-dom";
import { createNewWithdrawal } from "../../services/Withdrawal";

const MakeWithdrawal: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<MakeWithdrawalPayload>();
  const navigate = useNavigate();

  const createWithdrawalSubmit = async (data: MakeWithdrawalPayload) => {
    const response = await createNewWithdrawal(data);
    if (response) {
      navigate("/");
      return;
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <i className="fas fa-up-long" />
          <h2 className="text-2xl">Make withdrawal</h2>
        </div>
      </div>
      <form
        className="p-4 gap-4 grid grid-cols-2"
        onSubmit={handleSubmit(createWithdrawalSubmit)}
      >
        <Input
          label="Withdrawal value"
          placeholder="Withdrawal value"
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
          title="Make withdrawal"
          icon="fas fa-up-long"
          submitting={isSubmitting}
        />
      </form>
    </div>
  );
};

export default MakeWithdrawal;

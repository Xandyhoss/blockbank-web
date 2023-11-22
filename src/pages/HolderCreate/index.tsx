import { useForm } from "react-hook-form";
import Input from "../../components/Input";
import Button from "../../components/Button";
import { createHolder } from "../../services/Holder";
import { useNavigate } from "react-router-dom";

const HolderCreate: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CreateHolderPayload>();
  const navigate = useNavigate();

  const createHolderSubmit = async (data: CreateHolderPayload) => {
    const response = await createHolder(data);
    if (response) {
      navigate("/holders");
      return;
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <i className="fas fa-user" />
          <h2 className="text-2xl">Create holder</h2>
        </div>
      </div>
      <form
        className="p-4 gap-4 grid grid-cols-2"
        onSubmit={handleSubmit(createHolderSubmit)}
      >
        <Input
          label="Username"
          placeholder="Username"
          {...register("username", {
            required: "Required field",
          })}
          errors={errors.username}
        />
        <Input
          label="Password"
          placeholder="Password"
          {...register("password", {
            required: "Required field",
            minLength: {
              value: 8,
              message: "Password must be at least 8 characters long",
            },
          })}
          errors={errors.password}
          type="password"
        />
        <Input
          label="Name"
          placeholder="Name"
          {...register("name", {
            required: "Required field",
          })}
          errors={errors.name}
        />
        <Input
          label="Doument"
          placeholder="Document"
          {...register("document", {
            required: "Required field",
          })}
          errors={errors.document}
        />
        <Button
          className="col-start-2 justify-self-end"
          type="submit"
          title="Create holder"
          icon="fas fa-plus"
          submitting={isSubmitting}
        />
      </form>
    </div>
  );
};

export default HolderCreate;

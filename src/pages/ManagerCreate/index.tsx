import { useForm } from "react-hook-form";
import Input from "../../components/Input";
import Button from "../../components/Button";
import { useNavigate } from "react-router-dom";
import { createManager } from "../../services/Manager";

const ManagerCreate: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CreateHolderPayload>();
  const navigate = useNavigate();

  const createManagerSubmit = async (data: CreateManagerPayload) => {
    const response = await createManager(data);
    if (response) {
      navigate("/managers");
      return;
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <i className="fas fa-screwdriver" />
          <h2 className="text-2xl">Create manager</h2>
        </div>
      </div>
      <form
        className="p-4 gap-4 grid grid-cols-2"
        onSubmit={handleSubmit(createManagerSubmit)}
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
          title="Create manager"
          icon="fas fa-plus"
          submitting={isSubmitting}
        />
      </form>
    </div>
  );
};

export default ManagerCreate;

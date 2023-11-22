import { FormEvent, useCallback, useEffect, useState } from "react";
import Button from "../../components/Button";
import Input from "../../components/Input";
import img from "./../../assets/logo.png";
import { useAuth } from "../../context/Auth/useAuth";
import { useNavigate } from "react-router-dom";

const Login: React.FC = () => {
  const { user } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLoginSubmit = useCallback(
    async (e: FormEvent) => {
      e.preventDefault();
      if (username !== "" && password !== "") {
        const res = await login({ username, password });

        if (res) {
          navigate("/");
        }
      }
    },
    [login, navigate, password, username]
  );

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [navigate, user]);

  return (
    <div className="w-[100%] h-[100%] flex flex-col gap-10 justify-center items-center">
      <img src={img} className="w-72" />
      <div
        className="h-auto px-20 rounded-md bg-white text-dark-800
       flex flex-col gap-4 justify-center items-center py-8"
      >
        <p className="text-xl m-0">Login</p>
        <form
          onSubmit={handleLoginSubmit}
          className="flex flex-col items-center gap-5"
        >
          <Input
            name="user"
            placeholder="User"
            onChange={(e) => setUsername(e.target.value)}
          />
          <Input
            name="password"
            placeholder="Password"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button type="submit" title="Enter" variant="primary" />
        </form>
      </div>
    </div>
  );
};

export default Login;

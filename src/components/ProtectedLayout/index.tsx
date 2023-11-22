import { Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/Auth/useAuth";
import { getUserRole } from "../../utils/getUserRole";
import { useCallback, useEffect } from "react";

interface ProtectedLayoutProps {
  children: React.ReactNode;
  authorizedRoles?: string[];
}

const ProtectedLayout: React.FC<ProtectedLayoutProps> = ({
  children,
  authorizedRoles,
}) => {
  const { user, getUserLogged } = useAuth();
  const role = getUserRole(user?.account_type);
  const navigate = useNavigate();

  const checkLogin = useCallback(async () => {
    const res = await getUserLogged();
    if (!res) {
      navigate("/login");
    }
  }, [getUserLogged, navigate]);

  useEffect(() => {
    if (!user) {
      checkLogin();
    }
  }, [checkLogin, user]);

  if (!authorizedRoles) return children;

  if (!user && !authorizedRoles?.includes(role)) {
    return <>Loading...</>;
  }

  if (!authorizedRoles.includes(role)) return <Navigate to="/" />;
  return children;
};

export default ProtectedLayout;

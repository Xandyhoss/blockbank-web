import { Outlet, useNavigate } from "react-router-dom";
import logo from "./../../assets/logo-symbol.png";
import "./home.css";
import Button from "../../components/Button";
import { useAuth } from "../../context/Auth/useAuth";
import MobileNav from "../../components/MobileNav";
import { getUserRole } from "../../utils/getUserRole";
import { IRoute, Routes } from "../../routes/routes";

const Home: React.FC = () => {
  const { logout, user } = useAuth();
  const navigate = useNavigate();

  const getNavRoutes = () => {
    const routes = Routes;
    const mainRoute = routes.filter((route) => route.path === "/")[0];
    const childrenRoutes = mainRoute.children as IRoute[];
    const filteredRoutes = childrenRoutes?.filter(
      (route) =>
        route.authorizedRoles?.includes(getUserRole(user?.account_type)) &&
        !route.hidden
    );
    return filteredRoutes;
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(user?.holder_key as string);
    document.getElementById("copyKeyButton")?.classList.add("copied");
    document.getElementById("copyKeyButton2")?.classList.add("copied");
    setTimeout(() => {
      document.getElementById("copyKeyButton")?.classList.remove("copied");
      document.getElementById("copyKeyButton2")?.classList.remove("copied");
    }, 2000);
  };

  return (
    <div className="home-container">
      <div className="lateral-nav">
        <img src={logo} className="w-20 h-max" />
        <div className="w-full flex flex-col items-center">
          <p className="font-bold">{user?.username}</p>
          <p className="text-[10px] mb-2">
            {user?.holder_key.substring(0, 25)}...
          </p>
          {getUserRole(user?.account_type) === "holder" && (
            <Button
              id="copyKeyButton"
              title="Copy key"
              variant="primary"
              icon="fas fa-key"
              onClick={() => {
                copyToClipboard();
              }}
            />
          )}
        </div>
        <hr className="separator" />
        <ul className="lateral-menu">
          {getNavRoutes().map((route, idx) => (
            <li
              onClick={() =>
                navigate(route.index ? "/" : (route.path as string))
              }
              key={idx}
              className="lateral-menu-item"
            >
              {route.name}
            </li>
          ))}
        </ul>
        <Button
          title="Logout"
          icon="fas fa-door-open"
          variant={"primary"}
          onClick={() => logout()}
        />
      </div>
      <MobileNav copyToClipboard={copyToClipboard} navRoutes={getNavRoutes()} />
      <div className="content">
        <Outlet />
      </div>
    </div>
  );
};

export default Home;

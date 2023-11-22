import { useState } from "react";
import logo from "./../../assets/logo-symbol.png";
import Button from "../Button";
import { useAuth } from "../../context/Auth/useAuth";
import "./mobileNav.css";
import classNames from "classnames";
import { getUserRole } from "../../utils/getUserRole";
import { IRoute } from "../../routes/routes";
import { useNavigate } from "react-router-dom";

interface MobileNavProps {
  copyToClipboard: () => void;
  navRoutes: IRoute[];
}

const MobileNav: React.FC<MobileNavProps> = ({
  copyToClipboard,
  navRoutes,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { logout, user } = useAuth();
  const navigate = useNavigate();

  return (
    <>
      <div
        className={classNames(
          "mobile-nav",
          mobileMenuOpen ? "h-full p-8" : "h-0"
        )}
      >
        <i
          className="fas fa-times text-2xl cursor-pointer"
          onClick={() => setMobileMenuOpen(false)}
        />
        <img src={logo} className="w-20 h-max" />
        <div className="w-full flex flex-col items-center">
          <p className="font-bold">{user?.username}</p>
          <p className="text-[10px] mb-2">
            {user?.holder_key.substring(0, 25)}...
          </p>
          {getUserRole(user?.account_type) === "holder" && (
            <Button
              id="copyKeyButton2"
              title="Copy key"
              variant="primary"
              icon="fas fa-key"
              onClick={() => {
                copyToClipboard();
              }}
            />
          )}
        </div>
        <hr className="mobile-separator" />
        <ul className="mobile-menu">
          {navRoutes.map((route, idx) => (
            <li
              onClick={() => {
                navigate(route.index ? "/" : (route.path as string));
                setMobileMenuOpen(false);
              }}
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
      <div
        className={`mobile-overlay ${mobileMenuOpen ? "h-screen" : "h-0"}`}
      />
      <div className="flex items-center md:hidden">
        <div
          className="mobile-hamburguer"
          onClick={() => setMobileMenuOpen(true)}
        >
          <i className="fas fa-bars" />
        </div>
        <div className="text-white font-bold w-full text-center">
          {user?.username}
        </div>
      </div>
    </>
  );
};

export default MobileNav;

import { useNavigate } from "react-router-dom";
import "./manager.css";

const ManagerPanel: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-2 items-center">
        <i className="fas fa-screwdriver-wrench" />
        <h2 className="text-2xl">Manager Panel</h2>
      </div>
      <div className="manager-item" onClick={() => navigate("/holders")}>
        <i className="fas fa-user" />
        <p className="">Manage Holders</p>
      </div>
      <div className="manager-item" onClick={() => navigate("/managers")}>
        <i className="fas fa-screwdriver" />
        <p className="">Manage Managers</p>
      </div>
    </div>
  );
};

export default ManagerPanel;

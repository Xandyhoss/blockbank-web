// import HolderPanel from "./holder";
import { ReactNode } from "react";
import ManagerPanel from "./manager";
import HolderPanel from "./holder";
import { getUserRole } from "../../utils/getUserRole";
import { useAuth } from "../../context/Auth/useAuth";

const Panel: React.FC = () => {
  const { user } = useAuth();
  const role = getUserRole(user?.account_type);
  const panelMap = new Map<string, ReactNode>([
    ["holder", <HolderPanel />],
    ["manager", <ManagerPanel />],
  ]);

  return panelMap.get(role);
};

export default Panel;

import { useCallback, useEffect, useState } from "react";
import "./managerManagement.css";
import { getManagers } from "../../services/Manager";
import { useLoading } from "../../context/Loading/useLoading";
import Loading from "../../components/Loading";
import Button from "../../components/Button";
import { useNavigate } from "react-router-dom";

const ManagersManagement: React.FC = () => {
  const { localLoading, defineLocalLoading } = useLoading();
  const navigate = useNavigate();
  const [managers, setManagers] = useState<Manager[]>();

  const listManagers = useCallback(async () => {
    try {
      defineLocalLoading(true);
      const response = await getManagers();
      if (response) {
        setManagers(response);
      }
    } finally {
      defineLocalLoading(false);
    }
  }, []);

  useEffect(() => {
    listManagers();
  }, [listManagers]);
  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <i className="fas fa-screwdriver" />
          <h2 className="text-2xl">Managers</h2>
        </div>
        <Button
          title="Create Manager"
          icon="fas fa-plus"
          variant="secondary"
          onClick={() => navigate("/managers/create")}
        />
      </div>
      {localLoading && <Loading />}
      {managers &&
        managers?.map((manager) => (
          <div className="flex flex-col gap-1" key={manager["@key"]}>
            <div className="manager-management-item">
              <div className="flex gap-2">
                <i className="fas fa-screwdriver" />
                <p className="font-bold text-sm">{manager.name}</p>
              </div>
              <div className="flex gap-2">
                <p className="text-sm">{manager["@key"]}</p>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
};

export default ManagersManagement;

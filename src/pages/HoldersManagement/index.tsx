import { useCallback, useEffect, useState } from "react";
import "./holderManagement.css";
import { getHolders } from "../../services/Holder";
import { useLoading } from "../../context/Loading/useLoading";
import Loading from "../../components/Loading";
import EmptyMessage from "../../components/EmptyMessage";
import Button from "../../components/Button";
import { useNavigate } from "react-router-dom";

const HoldersManagement: React.FC = () => {
  const { localLoading, defineLocalLoading } = useLoading();
  const navigate = useNavigate();
  const [holders, setHolders] = useState<Holder[]>([]);

  const listHolders = useCallback(async () => {
    try {
      defineLocalLoading(true);
      const response = await getHolders();
      if (response) {
        setHolders(response);
      }
    } finally {
      defineLocalLoading(false);
    }
  }, []);

  useEffect(() => {
    listHolders();
  }, [listHolders]);
  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <i className="fas fa-user" />
          <h2 className="text-2xl">Holders</h2>
        </div>
        <Button
          title="Create Holder"
          icon="fas fa-plus"
          variant="secondary"
          onClick={() => navigate("/holders/create")}
        />
      </div>
      {localLoading && <Loading />}
      {holders &&
        holders?.map((holder) => (
          <div className="holder-management-item" key={holder["@key"]}>
            <div className="flex gap-2">
              <i className="fas fa-user" />
              <p className="font-bold text-sm">{holder.name}</p>
            </div>
            <div className="flex gap-2">
              <p className="text-sm">{holder["@key"]}</p>
            </div>
            <div className="flex gap-2">
              <i className="fas fa-right-to-bracket holder-management-icon" />
            </div>
          </div>
        ))}
      <EmptyMessage<Holder>
        condition={!localLoading}
        message="No holders found"
        itemString={holders}
      />
    </div>
  );
};

export default HoldersManagement;

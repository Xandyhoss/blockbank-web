/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-case-declarations */
import { useCallback, useEffect, useState } from "react";
import { useAuth } from "../../context/Auth/useAuth";
import "./holder.css";
import { useLoading } from "../../context/Loading/useLoading";
import { getHolderByKey } from "../../services/Holder";
import Loading from "../../components/Loading";
import classNames from "classnames";
import { getTransfersByHolderKey } from "../../services/Transfers";
import { format } from "date-fns";
import { getDepositByHolderKey } from "../../services/Deposit";
import { getWithdrawalByKey } from "../../services/Withdrawal";
import { getPurchasesByHolderKey } from "../../services/Purchases";
import EmptyMessage from "../../components/EmptyMessage";
import { getCreditCardByHolderKey } from "../../services/CreditCard";
import { useNavigate } from "react-router-dom";
import Button from "../../components/Button";

const OperationType = new Map<string, string>([
  ["transferency", "Transferency"],
  ["deposit", "Deposit"],
  ["withdrawal", "Withdrawal"],
  ["purchase", "Purchase"],
]);

interface RenderItem {
  "@assetType": string;
  "@key": string;
  [key: string]: any;
}

const HolderPanel: React.FC = () => {
  const { user } = useAuth();
  const { defineLocalLoading, localLoading } = useLoading();
  const navigate = useNavigate();

  const [holder, setHolder] = useState<Holder>();
  const [selectedItem, setSelectedItem] = useState("all");

  const [receivedTransfers, setReceivedTransfers] = useState<Transfer[]>([]);
  const [sentTransfers, setSentTransfers] = useState<Transfer[]>([]);
  const [deposits, setDeposits] = useState<Deposit[]>([]);
  const [withdrawals, setWithdrawals] = useState<Withdrawal[]>([]);
  const [purchases, setPurchases] = useState<Purchase[]>([]);

  const [creditCard, setCreditCard] = useState<CreditCard>();

  const getTransfers = useCallback(async () => {
    const receivedTransfersRes = await getTransfersByHolderKey({
      holderKey: user?.holder_key as string,
      sent: false,
    });
    const sentTransfersRes = await getTransfersByHolderKey({
      holderKey: user?.holder_key as string,
      sent: true,
    });

    if (receivedTransfersRes) {
      setReceivedTransfers(receivedTransfersRes);
    }
    if (sentTransfersRes) {
      setSentTransfers(sentTransfersRes);
    }
  }, [user?.holder_key]);

  useEffect(() => {
    try {
      defineLocalLoading(true);
      getTransfers();
    } finally {
      defineLocalLoading(false);
    }
  }, [defineLocalLoading, getTransfers]);

  const getDeposits = useCallback(async () => {
    const depositsRes = await getDepositByHolderKey({
      holderKey: user?.holder_key as string,
    });

    if (depositsRes) {
      setDeposits(depositsRes);
    }
  }, [user?.holder_key]);

  useEffect(() => {
    try {
      defineLocalLoading(true);
      getDeposits();
    } finally {
      defineLocalLoading(false);
    }
  }, [defineLocalLoading, getDeposits]);

  const getWithdrawals = useCallback(async () => {
    const withdrawalsRes = await getWithdrawalByKey({
      holderKey: user?.holder_key as string,
    });

    if (withdrawalsRes) {
      setWithdrawals(withdrawalsRes);
    }
  }, [user?.holder_key]);

  useEffect(() => {
    try {
      defineLocalLoading(true);
      getWithdrawals();
    } finally {
      defineLocalLoading(false);
    }
  }, [defineLocalLoading, getWithdrawals]);

  const getPurchases = useCallback(async () => {
    const purchasesRes = await getPurchasesByHolderKey({
      holderKey: user?.holder_key as string,
    });

    if (purchasesRes) {
      setPurchases(purchasesRes);
    }
  }, [user?.holder_key]);

  useEffect(() => {
    try {
      defineLocalLoading(true);
      getPurchases();
    } finally {
      defineLocalLoading(false);
    }
  }, [defineLocalLoading, getPurchases]);

  const getCreditCard = useCallback(async () => {
    try {
      defineLocalLoading(true);
      const response = await getCreditCardByHolderKey(
        user?.holder_key as string
      );
      if (response) {
        setCreditCard(response);
      }
    } finally {
      defineLocalLoading(false);
    }
  }, []);

  useEffect(() => {
    getCreditCard();
  }, [getCreditCard]);

  const renderItems = useCallback(
    (items: RenderItem[]) => {
      if (items.length === 0) {
        return (
          <EmptyMessage
            condition={true}
            message={"No items found"}
            itemString={[]}
          />
        );
      }
      const orderedItems = items.sort((a, b) => {
        return new Date(b.date).valueOf() - new Date(a.date).valueOf();
      });
      return orderedItems.map((item, idx) => {
        switch (item["@assetType"]) {
          case "transferency":
            const transferency = item as unknown as Transfer;
            return (
              <div className="history-item" key={idx}>
                <div className="flex gap-2">
                  <i
                    className={classNames("fas", {
                      "fa-arrow-up":
                        transferency.sender["@key"] === user?.holder_key,
                      "fa-arrow-down":
                        transferency.receiver["@key"] === user?.holder_key,
                      "text-red-500":
                        transferency.sender["@key"] === user?.holder_key,
                      "text-green-500":
                        transferency.receiver["@key"] === user?.holder_key,
                    })}
                  />
                  <p className="font-bold text-sm">
                    {OperationType.get(item["@assetType"] as string)}
                  </p>
                </div>
                <p className="justify-self-center">
                  {format(new Date(transferency.date), "dd/MM/yy - HH:mm")}
                </p>
                <p
                  className={classNames("font-bold justify-self-end", {
                    "text-red-500":
                      transferency.sender["@key"] === user?.holder_key,
                    "text-green-500":
                      transferency.receiver["@key"] === user?.holder_key,
                  })}
                >
                  R$ {(transferency.value as number).toLocaleString()}
                </p>
              </div>
            );
          case "deposit":
            const deposit = item as unknown as Deposit;
            return (
              <div className="history-item" key={idx}>
                <div className="flex gap-2">
                  <i
                    className={classNames("fas fa-arrow-down text-green-500")}
                  />
                  <p className="font-bold text-sm">
                    {OperationType.get(item["@assetType"] as string)}
                  </p>
                </div>
                <p className="justify-self-center">
                  {format(new Date(deposit.date), "dd/MM/yy - HH:mm")}
                </p>
                <p
                  className={classNames(
                    "font-bold justify-self-end text-green-500"
                  )}
                >
                  R$ {(deposit.value as number).toLocaleString("pt-BR")}
                </p>
              </div>
            );
          case "withdrawal":
            const withdrawal = item as unknown as Withdrawal;
            return (
              <div className="history-item" key={idx}>
                <div className="flex gap-2">
                  <i className={classNames("fas fa-arrow-up text-red-500")} />
                  <p className="font-bold text-sm">
                    {OperationType.get(item["@assetType"] as string)}
                  </p>
                </div>
                <p className="justify-self-center">
                  {format(new Date(withdrawal.date), "dd/MM/yy - HH:mm")}
                </p>
                <p
                  className={classNames(
                    "font-bold justify-self-end text-red-500"
                  )}
                >
                  R$ {(withdrawal.value as number).toLocaleString("pt-BR")}
                </p>
              </div>
            );
          case "purchase":
            const purchase = item as unknown as Purchase;
            return (
              <div className="history-item" key={idx}>
                <div className="flex gap-2">
                  <i className={classNames("fas fa-arrow-up text-red-500")} />
                  <p className="font-bold text-sm">
                    {OperationType.get(item["@assetType"] as string)}
                  </p>
                </div>
                <p className="justify-self-center">
                  {format(new Date(purchase.date), "dd/MM/yy - HH:mm")}
                </p>
                <p
                  className={classNames(
                    "font-bold justify-self-end text-red-500"
                  )}
                >
                  R$ {(purchase.value as number).toLocaleString("pt-BR")}
                </p>
              </div>
            );
        }
      });
    },
    [user?.holder_key]
  );

  const getHolder = useCallback(async () => {
    try {
      defineLocalLoading(true);
      const response = await getHolderByKey(user?.holder_key as string);
      if (response) {
        setHolder(response);
      }
    } finally {
      defineLocalLoading(false);
    }
  }, []);

  useEffect(() => {
    getHolder();
  }, [getHolder]);

  if (localLoading) {
    return <Loading />;
  }

  if (!holder) {
    return <Loading />;
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="w-full flex flex-col md:flex-row gap-4">
        <div className="card">
          <p className="card-title">Balance</p>
          <p className="card-value">R$ {holder.cash.toLocaleString()}</p>
        </div>
        {creditCard && (
          <div
            className="card cursor-pointer
          hover:bg-slate-200 transition-all"
            onClick={() => navigate("/creditCard/")}
          >
            <p className="card-title">Credit Card</p>
            <div className="flex flex-col">
              <p className="card-value !text-green-600 !text-sm">
                R$ {creditCard.limit.toLocaleString()}
              </p>
              <p className="card-value !text-red-500">
                R$ {creditCard.limitUsed.toLocaleString()}
              </p>
            </div>
          </div>
        )}
      </div>
      <div className="w-full flex gap-2 justify-end">
        <Button
          title="Deposit"
          icon="fas fa-down-long"
          onClick={() => navigate("/deposit")}
        />
        <Button
          title="Withdrawal"
          icon="fas fa-up-long"
          onClick={() => navigate("/withdrawal")}
        />
        <Button
          title="Transfer"
          icon="fas fa-money-bill-transfer"
          onClick={() => navigate("/transferency")}
        />
        <Button
          title="Purchase"
          icon="fas fa-dollar-sign"
          onClick={() => navigate("/purchase")}
        />
      </div>
      <div className="w-full">
        <ul className="horizontal-nav">
          <li
            onClick={() => setSelectedItem("all")}
            className={classNames("horizontal-nav-item", {
              "selected-item": selectedItem === "all",
            })}
          >
            All
          </li>
          <li
            onClick={() => setSelectedItem("deposits")}
            className={classNames("horizontal-nav-item", {
              "selected-item": selectedItem === "deposits",
            })}
          >
            Deposits
          </li>
          <li
            onClick={() => setSelectedItem("withdrawals")}
            className={classNames("horizontal-nav-item", {
              "selected-item": selectedItem === "withdrawals",
            })}
          >
            Withdrawals
          </li>
          <li
            onClick={() => setSelectedItem("purchases")}
            className={classNames("horizontal-nav-item", {
              "selected-item": selectedItem === "purchases",
            })}
          >
            Purchases
          </li>
          <li
            onClick={() => setSelectedItem("transfers")}
            className={classNames("horizontal-nav-item", {
              "selected-item": selectedItem === "transfers",
            })}
          >
            Transfers
          </li>
        </ul>
      </div>
      <div className="w-full flex flex-col gap-1">
        {renderItems(
          (selectedItem === "all" && [
            ...sentTransfers,
            ...receivedTransfers,
            ...deposits,
            ...withdrawals,
            ...purchases,
          ]) ||
            (selectedItem === "deposits" && [...deposits]) ||
            (selectedItem === "withdrawals" && [...withdrawals]) ||
            (selectedItem === "transfers" && [
              ...sentTransfers,
              ...receivedTransfers,
            ]) ||
            (selectedItem === "purchases" && [...purchases]) ||
            []
        )}
      </div>
    </div>
  );
};

export default HolderPanel;

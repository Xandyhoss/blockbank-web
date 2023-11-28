/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-case-declarations */
import { useCallback, useEffect, useState } from "react";
import { useLoading } from "../../context/Loading/useLoading";
import Loading from "../../components/Loading";
import Button from "../../components/Button";
import { useNavigate } from "react-router-dom";
import { getHolderByKey } from "../../services/Holder";
import { useAuth } from "../../context/Auth/useAuth";
import {
  getCreditCardByHolderKey,
  getCreditCardPaymentsByCreditCardKey,
  getCreditCardPurchasesByCreditCardKey,
} from "../../services/CreditCard";
import Logo from "./../../assets/logo-symbol.png";
import "./creditCard.css";
import classNames from "classnames";
import { format } from "date-fns";
import EmptyMessage from "../../components/EmptyMessage";

interface RenderItem {
  "@assetType": string;
  "@key": string;
  [key: string]: any;
}

const CreditCard: React.FC = () => {
  const { user } = useAuth();
  const { localLoading, defineLocalLoading } = useLoading();
  const navigate = useNavigate();
  const [holder, setHolder] = useState<Holder>();
  const [creditCard, setCreditCard] = useState<CreditCard>();
  const [creditCardPurchases, setCreditCardPurchases] = useState<
    CreditCardPurchase[]
  >([]);
  const [creditCardPayments, setCreditCardPayments] = useState<
    CreditCardPayment[]
  >([]);

  const [selectedItem, setSelectedItem] = useState("all");

  const copyToClipboard = () => {
    navigator.clipboard.writeText(creditCard?.["@key"] as string);
    document.getElementById("cc-copy-button")?.classList.add("cc-copied");
    setTimeout(() => {
      document.getElementById("cc-copy-button")?.classList.remove("cc-copied");
    }, 2000);
  };

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

  const getPurchases = useCallback(async () => {
    try {
      defineLocalLoading(true);
      const response = await getCreditCardPurchasesByCreditCardKey(
        creditCard?.["@key"] as string
      );
      if (response) {
        setCreditCardPurchases(response);
      }
    } finally {
      defineLocalLoading(false);
    }
  }, [creditCard]);

  useEffect(() => {
    if (creditCard) {
      getPurchases();
    }
  }, [creditCard, getPurchases]);

  const getPayments = useCallback(async () => {
    try {
      defineLocalLoading(true);
      const response = await getCreditCardPaymentsByCreditCardKey(
        creditCard?.["@key"] as string
      );
      if (response) {
        setCreditCardPayments(response);
      }
    } finally {
      defineLocalLoading(false);
    }
  }, [creditCard]);

  useEffect(() => {
    if (creditCard) {
      getPayments();
    }
  }, [creditCard, getPayments]);

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
          case "creditCardPurchase":
            const ccPurchase = item as unknown as CreditCardPurchase;
            return (
              <div className="history-item" key={idx}>
                <div className="flex gap-2">
                  <i className={classNames("fas fa-arrow-up text-red-500")} />
                  <p className="font-bold text-sm">{ccPurchase.description}</p>
                </div>
                <p className="justify-self-center">
                  {format(new Date(item.date), "dd/MM/yy - HH:mm")}
                </p>
                <p
                  className={classNames(
                    "font-bold justify-self-end text-red-500"
                  )}
                >
                  R$ {ccPurchase.value.toFixed(2).toLocaleString()}
                </p>
              </div>
            );
          case "invoicePayment":
            const ccPayment = item as unknown as CreditCardPayment;
            return (
              <div className="history-item" key={idx}>
                <div className="flex gap-2">
                  <i
                    className={classNames("fas fa-arrow-down text-green-500")}
                  />
                  <p className="font-bold text-sm">Payment</p>
                </div>
                <p className="justify-self-center">
                  {format(new Date(item.date), "dd/MM/yy - HH:mm")}
                </p>
                <p
                  className={classNames(
                    "font-bold justify-self-end text-green-500"
                  )}
                >
                  R$ {ccPayment.value.toFixed(2).toLocaleString()}
                </p>
              </div>
            );
        }
      });
    },
    [user?.holder_key]
  );

  if (localLoading || !holder) {
    return <Loading />;
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <i className="fas fa-credit-card" />
          <h2 className="text-2xl">Credit Card</h2>
        </div>
        {holder.ccAvailable && !creditCard && (
          <Button
            title="Create a credit card"
            icon="fas fa-plus"
            variant="secondary"
            onClick={() => navigate("/creditCard/create")}
          />
        )}
      </div>
      {holder.ccAvailable && !creditCard && (
        <div className="cc-message">
          A credit card is available to this account. You can create one right
          now!
        </div>
      )}
      {!holder.ccAvailable && (
        <div className="cc-message">
          Credit card is not available to this account
        </div>
      )}
      {creditCard && (
        <>
          <div className="cc-content">
            <div className="cc-block">
              <img
                src={Logo}
                alt="BlockBank"
                className="w-24
              top-[10%] left-[5%] absolute"
              />
              <div
                onClick={() => copyToClipboard()}
                id="cc-copy-button"
                className="cc-copy-button"
              >
                <i className="fas fa-copy " />
              </div>
              <div className="cc-details">
                <div className="font-bold text-white text-lg">
                  {creditCard?.number.match(/.{1,4}/g)?.join(" ")}
                </div>
                <div className="font-bold text-white text-xs">
                  {holder.name.toUpperCase()}
                </div>
              </div>
            </div>
            <div className="cc-limits">
              <div>
                <div className="text-dukeBlue-800 text-xl font-bold">
                  Limits
                </div>
                <div className="text-black text-sm font-bold">
                  {creditCard.creditCardName}
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <div className="flex flex-col items-end">
                  <div className="font-bold text-sm">Limit used</div>
                  <div className="text-red-500 text-3xl font-bold">
                    R$ {creditCard?.limitUsed.toLocaleString()}
                  </div>
                </div>
                <div className="flex flex-col items-end">
                  <div className="font-bold text-sm">Limit available</div>
                  <div className="text-green-600 text-3xl font-bold">
                    R${" "}
                    {(
                      creditCard?.limit - creditCard?.limitUsed
                    ).toLocaleString()}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full flex gap-2 justify-end">
            <Button
              title="Create Purchase"
              icon="fas fa-dollar-sign"
              onClick={() =>
                navigate("/creditCard/create-purchase", {
                  state: {
                    creditCardKey: creditCard["@key"],
                  },
                })
              }
            />
            <Button
              title="Pay invoice"
              icon="fas fa-file-invoice-dollar"
              onClick={() =>
                navigate("/creditcard/pay-invoice", {
                  state: {
                    creditCardKey: creditCard["@key"],
                  },
                })
              }
            />
            <Button
              title="Change card name"
              icon="fas fa-arrows-spin"
              variant="secondary"
              onClick={() =>
                navigate("/creditCard/update-name", {
                  state: { creditCardKey: creditCard["@key"] },
                })
              }
            />
          </div>
          <div className="w-full">
            <ul className="cc-horizontal-nav">
              <li
                onClick={() => setSelectedItem("all")}
                className={classNames("cc-horizontal-nav-item", {
                  "selected-item": selectedItem === "all",
                })}
              >
                All
              </li>
              <li
                onClick={() => setSelectedItem("purchases")}
                className={classNames("cc-horizontal-nav-item", {
                  "selected-item": selectedItem === "purchases",
                })}
              >
                Purchases
              </li>
              <li
                onClick={() => setSelectedItem("payments")}
                className={classNames("cc-horizontal-nav-item", {
                  "selected-item": selectedItem === "payments",
                })}
              >
                Payments
              </li>
            </ul>
          </div>
          <div className="w-full flex flex-col gap-1">
            {renderItems(
              (selectedItem === "all" && [
                ...creditCardPurchases,
                ...creditCardPayments,
              ]) ||
                (selectedItem === "purchases" && [...creditCardPurchases]) ||
                (selectedItem === "payments" && [...creditCardPayments]) ||
                []
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default CreditCard;

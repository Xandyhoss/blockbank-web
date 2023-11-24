/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-case-declarations */
import { useCallback, useEffect, useState } from "react";
import { useLoading } from "../../context/Loading/useLoading";
import Loading from "../../components/Loading";
import Button from "../../components/Button";
import { useNavigate, useParams } from "react-router-dom";
import { getHolderByKey } from "../../services/Holder";
// import { useAuth } from "../../context/Auth/useAuth";
import {
  activateCreditCard,
  getCreditCardByHolderKey,
  //   getCreditCardPaymentsByCreditCardKey,
  //   getCreditCardPurchasesByCreditCardKey,
} from "../../services/CreditCard";
import Modal from "../../components/Modal";
import { useForm } from "react-hook-form";

const ManageHolder: React.FC = () => {
  //   const { user } = useAuth();
  const { localLoading, defineLocalLoading } = useLoading();
  const navigate = useNavigate();
  const { key: holderKey } = useParams();

  const [holder, setHolder] = useState<Holder>();
  const [creditCard, setCreditCard] = useState<CreditCard>();
  //   const [creditCardPurchases, setCreditCardPurchases] = useState<
  //     CreditCardPurchase[]
  //   >([]);
  //   const [creditCardPayments, setCreditCardPayments] = useState<
  //     CreditCardPayment[]
  //   >([]);

  const [activateCardModal, setActivateCardModal] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(holder?.["@key"] as string);
  };

  useEffect(() => {
    if (!holderKey) {
      navigate("/holders");
    }
  }, [holderKey, navigate]);

  const getHolder = useCallback(async () => {
    try {
      defineLocalLoading(true);
      const response = await getHolderByKey(holderKey as string);
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
      const response = await getCreditCardByHolderKey(holderKey as string);
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

  //   const getPurchases = useCallback(async () => {
  //     try {
  //       defineLocalLoading(true);
  //       const response = await getCreditCardPurchasesByCreditCardKey(
  //         creditCard?.["@key"] as string
  //       );
  //       if (response) {
  //         setCreditCardPurchases(response);
  //       }
  //     } finally {
  //       defineLocalLoading(false);
  //     }
  //   }, [creditCard]);

  //   useEffect(() => {
  //     if (creditCard) {
  //       getPurchases();
  //     }
  //   }, [creditCard, getPurchases]);

  //   const getPayments = useCallback(async () => {
  //     try {
  //       defineLocalLoading(true);
  //       const response = await getCreditCardPaymentsByCreditCardKey(
  //         creditCard?.["@key"] as string
  //       );
  //       if (response) {
  //         setCreditCardPayments(response);
  //       }
  //     } finally {
  //       defineLocalLoading(false);
  //     }
  //   }, [creditCard]);

  //   useEffect(() => {
  //     if (creditCard) {
  //       getPayments();
  //     }
  //   }, [creditCard, getPayments]);

  const {
    handleSubmit: activateCreditCardHandleSubmit,
    formState: { isSubmitting: activateCreditCardSubmitting },
  } = useForm<ActivateCreditCardPayload>();

  const activateCreditCardSubmit = useCallback(async () => {
    const response = await activateCreditCard({
      holderKey: holderKey as string,
    });
    if (response) {
      setActivateCardModal(false);
      return;
    }
  }, [holderKey]);

  if (localLoading || !holder) {
    return <Loading />;
  }

  return (
    <>
      <Modal
        title="Activate Credit Card"
        render={activateCardModal}
        onConfirm={activateCreditCardHandleSubmit(activateCreditCardSubmit)}
        onCancel={() => setActivateCardModal(false)}
        submitting={activateCreditCardSubmitting}
      >
        <p className="font-bold">Activate credit card for {holder.name}?</p>
      </Modal>
      <div className="flex flex-col gap-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <i className="fas fa-user" />
            <h2 className="text-2xl">Manage holder</h2>
          </div>
        </div>
        <div className="w-full flex flex-col gap-4">
          <div className="flex flex-col">
            <p className="text-xl">Account</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <div className="flex flex-col gap-1 border-b-[1px] border-b-slate-400">
              <p className="font-bold text-sm">Holder name</p>
              <p>{holder.name}</p>
            </div>
            <div className="flex flex-col gap-1 border-b-[1px] border-b-slate-400">
              <p className="font-bold text-sm">Holder key</p>
              <div className="flex gap-2">
                <p>{holder["@key"]}</p>
                <i
                  className="fas fa-copy cursor-pointer"
                  onClick={copyToClipboard}
                />
              </div>
            </div>
            <div className="flex flex-col gap-1 border-b-[1px] border-b-slate-400">
              <p className="font-bold text-sm">Balance</p>
              <p>R$ {holder.cash.toLocaleString()}</p>
            </div>
            <div className="flex flex-col gap-1 border-b-[1px] border-b-slate-400">
              <p className="font-bold text-sm">Document number</p>
              <p>{holder.document}</p>
            </div>
          </div>
        </div>
        <div className="w-full flex flex-col gap-4 mt-4">
          <div className="flex justify-between">
            <p className="text-xl">Credit Card</p>
            <div>
              <Button
                title="Update limit"
                icon={"fas fa-plus"}
                variant="secondary"
                className="!h-8"
                onClick={() =>
                  navigate(`/creditCard/update-limit`, {
                    state: {
                      creditCardKey: creditCard?.["@key"],
                      holderKey: holder["@key"],
                    },
                  })
                }
              />
            </div>
          </div>
          {!holder.ccAvailable && (
            <div className="flex flex-col flex-wrap gap-3">
              <p>Credit card is not activated on this account</p>
              <Button
                title="Activate"
                icon="fas fa-credit-card"
                onClick={() => setActivateCardModal(true)}
              />
            </div>
          )}
          {creditCard ? (
            <div className="flex flex-wrap gap-3">
              <div className="flex flex-col gap-1 border-b-[1px] border-b-slate-400">
                <p className="font-bold text-sm">Credit card number</p>
                <p>{creditCard?.number}</p>
              </div>
              <div className="flex flex-col gap-1 border-b-[1px] border-b-slate-400">
                <p className="font-bold text-sm">Card name</p>
                <p>{creditCard.creditCardName}</p>
              </div>
              <div className="flex flex-col gap-1 border-b-[1px] border-b-slate-400">
                <p className="font-bold text-sm">Total limit</p>
                <p>R$ {creditCard.limit.toLocaleString()}</p>
              </div>
              <div className="flex flex-col gap-1 border-b-[1px] border-b-slate-400">
                <p className="font-bold text-sm">Used limit</p>
                <p>R$ {creditCard.limitUsed.toLocaleString()}</p>
              </div>
            </div>
          ) : (
            <div className="flex flex-col flex-wrap gap-3">
              <p>This holder didn't create a credit card yet.</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ManageHolder;

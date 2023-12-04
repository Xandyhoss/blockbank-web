import { toastEmmiter } from "../../utils/toastEmitter";
import requestAPI from "../api";

export const createCreditCard = async (payload: CreateCreditCardPayload) => {
  const response = await requestAPI<CreditCard, CreateCreditCardPayload>(
    "/creditcard/create",
    "post",
    payload,
    true
  );
  if (response) {
    toastEmmiter("Credit card created!", "success");
  }
  return response;
};

export const getCreditCardByHolderKey = async (holderKey: string) => {
  const response = await requestAPI<CreditCard>(
    `/creditcard/${holderKey}`,
    "get"
  );
  return response;
};

export const getCreditCardPurchasesByCreditCardKey = async (
  creditCardKey: string
) => {
  const response = await requestAPI<CreditCardPurchase[]>(
    `/creditcard/${creditCardKey}/purchases`,
    "get"
  );
  return response;
};

export const getCreditCardPaymentsByCreditCardKey = async (
  creditCardKey: string
) => {
  const response = await requestAPI<CreditCardPayment[]>(
    `/creditcard/${creditCardKey}/payments`,
    "get"
  );
  return response;
};

export const createNewCreditCardPurchase = async (
  payload: CreateCreditCardPurchasePayload
) => {
  const response = await requestAPI<
    CreditCardPurchase,
    CreateCreditCardPurchasePayload
  >("/creditcard/createPurchase", "post", payload, true);
  if (response) {
    toastEmmiter("Credit card purchase created!", "success");
  }
  return response;
};

export const activateCreditCard = async (
  payload: ActivateCreditCardPayload
) => {
  const response = await requestAPI<CreditCard, ActivateCreditCardPayload>(
    "/creditcard/activate",
    "post",
    payload,
    true
  );
  if (response) {
    toastEmmiter("Credit card activated!", "success");
  }
  return response;
};

export const payCreditCardInvoice = async (payload: PayInvoicePayload) => {
  const response = await requestAPI<CreditCardPayment, PayInvoicePayload>(
    "creditcard/payInvoice",
    "post",
    payload,
    true
  );
  if (response) {
    toastEmmiter("Credit card invoice paid!", "success");
  }
  return response;
};

export const updateCreditCardLimit = async (
  payload: UpdateCreditCardLimitPayload
) => {
  const response = await requestAPI<CreditCard, UpdateCreditCardLimitPayload>(
    "/creditcard/updateLimit",
    "post",
    payload,
    true
  );
  if (response) {
    toastEmmiter("Credit card limit updated!", "success");
  }
  return response;
};

export const updateCreditCardName = async (
  payload: UpdateCreditCardNamePayload
) => {
  const response = await requestAPI<CreditCard, UpdateCreditCardNamePayload>(
    "/creditcard/updateName/",
    "post",
    payload,
    true
  );
  if (response) {
    toastEmmiter("Credit card name updated!", "success");
  }
  return response;
};

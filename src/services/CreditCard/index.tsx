import requestAPI from "../api";

export const createCreditCard = async (payload: CreateCreditCardPayload) => {
  const response = await requestAPI<CreditCard, CreateCreditCardPayload>(
    "/creditcard/create",
    "post",
    payload
  );
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
  >("/creditcard/createPurchase", "post", payload);
  return response;
};

export const activateCreditCard = async (
  payload: ActivateCreditCardPayload
) => {
  const response = await requestAPI<CreditCard, ActivateCreditCardPayload>(
    "/creditcard/activate",
    "post",
    payload
  );
  return response;
};

export const payCreditCardInvoice = async (payload: PayInvoicePayload) => {
  const response = await requestAPI<CreditCardPayment, PayInvoicePayload>(
    "creditcard/payInvoice",
    "post",
    payload
  );
  return response;
};

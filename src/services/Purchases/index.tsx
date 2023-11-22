import requestAPI from "../api";

export const getPurchasesByHolderKey = async (
  payload: GetPurchasesByHolderKey
) => {
  const response = await requestAPI<Purchase[], GetPurchasesByHolderKey>(
    `/holder/${payload.holderKey}/purchases`,
    "get",
    payload
  );
  return response;
};

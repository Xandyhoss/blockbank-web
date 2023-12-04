import { toastEmmiter } from "../../utils/toastEmitter";
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

export const createNewPurchase = async (payload: CreatePurchasePayload) => {
  const response = await requestAPI<Purchase, CreatePurchasePayload>(
    "/holder/purchase",
    "post",
    payload,
    true
  );
  if (response) {
    toastEmmiter("Purchase created!", "success");
  }
  return response;
};

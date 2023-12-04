import { toastEmmiter } from "../../utils/toastEmitter";
import requestAPI from "../api";

export const getDepositByHolderKey = async (
  payload: GetDepositsByHolderKey
) => {
  const response = await requestAPI<Deposit[], GetDepositsByHolderKey>(
    `/holder/${payload.holderKey}/deposits`,
    "get",
    payload
  );
  return response;
};

export const createNewDeposit = async (payload: MakeDepositPayload) => {
  const response = await requestAPI<Deposit, MakeDepositPayload>(
    "/holder/deposit",
    "post",
    payload,
    true
  );
  if (response) {
    toastEmmiter("Deposit created!", "success");
  }
  return response;
};

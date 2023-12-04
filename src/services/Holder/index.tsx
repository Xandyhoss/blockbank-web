import { toastEmmiter } from "../../utils/toastEmitter";
import requestAPI from "../api";

export const getHolders = async () => {
  const response = await requestAPI<Holder[]>("/holder/list", "get");
  return response;
};

export const getHolderByKey = async (holderKey: string) => {
  const response = await requestAPI<Holder>(`/holder/${holderKey}`, "get");
  return response;
};

export const createHolder = async (payload: CreateHolderPayload) => {
  const response = await requestAPI<Holder, CreateHolderPayload>(
    "/holder/create",
    "post",
    payload
  );
  if (response) {
    toastEmmiter("Holder created!", "success");
  }
  return response;
};

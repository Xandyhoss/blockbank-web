import requestAPI from "../api";

export const getTransfersByHolderKey = async (
  payload: GetTransfersByHolderKey
) => {
  const response = await requestAPI<Transfer[], GetTransfersByHolderKey>(
    `/holder/${payload.holderKey}/transfers`,
    "post",
    payload
  );
  return response;
};

export const createNewTransferency = async (payload: MakeTransferPayload) => {
  const response = await requestAPI<Transfer, MakeTransferPayload>(
    "/holder/transferency",
    "post",
    payload
  );
  return response;
};

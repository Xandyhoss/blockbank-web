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

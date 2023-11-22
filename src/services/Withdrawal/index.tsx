import requestAPI from "../api";

export const getWithdrawalByKey = async (
  payload: GetWithdrawalsByHolderKey
) => {
  const response = await requestAPI<Withdrawal[], GetWithdrawalsByHolderKey>(
    `/holder/${payload.holderKey}/withdrawals`,
    "get",
    payload
  );
  return response;
};

export const createNewWithdrawal = async (payload: MakeWithdrawalPayload) => {
  const response = await requestAPI<Withdrawal, MakeWithdrawalPayload>(
    "/holder/withdraw",
    "post",
    payload
  );
  return response;
};

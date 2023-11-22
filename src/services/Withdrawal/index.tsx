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
interface Withdrawal {
  "@assetType": "withdrawal";
  "@key": string;
  date: string;
  holder: Holder;
  txId: string;
  value: number;
}

interface MakeWithdrawalPayload {
  value: number;
}

interface GetWithdrawalsByHolderKey {
  holderKey: string;
}

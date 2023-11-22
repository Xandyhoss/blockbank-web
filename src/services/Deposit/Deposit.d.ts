interface Deposit {
  "@assetType": "deposit";
  "@key": string;
  date: string;
  holder: Holder;
  txId: string;
  value: value;
}

interface GetDepositsByHolderKey {
  holderKey: string;
}

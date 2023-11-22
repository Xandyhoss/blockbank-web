interface Deposit {
  "@assetType": "deposit";
  "@key": string;
  date: string;
  holder: Holder;
  txId: string;
  value: value;
}

interface MakeDepositPayload {
  value: number;
}

interface GetDepositsByHolderKey {
  holderKey: string;
}

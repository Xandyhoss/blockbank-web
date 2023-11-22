interface Transfer {
  "@assetType": "transferency";
  "@key": string;
  date: string;
  receiver: Holder;
  sender: Holder;
  txId: string;
  value: number;
}
interface GetTransfersByHolderKey {
  holderKey: string;
  sent: boolean;
}

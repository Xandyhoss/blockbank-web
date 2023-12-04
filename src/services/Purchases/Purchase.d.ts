interface Purchase {
  "@assetType": "purchase";
  "@key": string;
  buyer: Holder;
  date: string;
  description: string;
  txId: string;
  value: number;
}

interface GetPurchasesByHolderKey {
  holderKey: string;
}

interface CreatePurchasePayload {
  description: string;
  value: number;
}

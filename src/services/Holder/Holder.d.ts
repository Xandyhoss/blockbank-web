interface Manager {
  "@assetType": "holder";
  "@key": string;
  document: string;
  name: string;
}

interface GetHolderByKeyPayload {
  holderKey: string;
}

interface CreateHolderPayload {
  username: string;
  password: string;
  name: string;
  document: string;
}

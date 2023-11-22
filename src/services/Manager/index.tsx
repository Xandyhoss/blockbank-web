import requestAPI from "../api";

export const getManagers = async () => {
  const response = await requestAPI<Manager[]>("/manager/list", "get");
  return response;
};

export const createManager = async (payload: CreateManagerPayload) => {
  const response = await requestAPI<Manager, CreateManagerPayload>(
    "/manager/create",
    "post",
    payload
  );
  return response;
};

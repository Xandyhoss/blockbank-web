import requestAPI from "../api";

export const signIn = async (
  credentials: UserCredentials
): Promise<User | null> => {
  const url = "/auth/login";

  const response = await requestAPI<User, UserCredentials>(
    url,
    "post",
    credentials
  );

  if (response) {
    return response;
  }
  return null;
};

export const signOut = async () => {
  const url = "/auth/logout";

  const response = requestAPI(url, "post");
  return response;
};

export const getLogged = async () => {
  const url = "/auth/";
  const response = await requestAPI<User>(url, "get");
  return response;
};

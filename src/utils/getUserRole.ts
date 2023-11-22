import { userType } from "../context/Auth";

export const getUserRole = (type?: number) => {
  return userType.get(type!) || "manager";
};

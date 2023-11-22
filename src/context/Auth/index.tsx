import { createContext, useCallback, useMemo, useState } from "react";
import { IAuthContext } from "./Auth";
import { getLogged, signIn, signOut } from "../../services/User";

export const AuthContext = createContext<IAuthContext>({
  user: null,
  login: async () => (({} as User) || null),
  logout: async () => ({} as Promise<void>),
  getUserLogged: async () => ({} as User),
});

// eslint-disable-next-line react-refresh/only-export-components
export const userType = new Map<number, string>([
  [0, "holder"],
  [1, "manager"],
]);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  const login = useCallback(
    async (credentials: UserCredentials): Promise<User | null> => {
      const response = await signIn(credentials);
      if (response) {
        setUser(response);
        return response;
      }
      return null;
    },
    []
  );

  const logout = useCallback(async () => {
    const response = await signOut();
    if (response) {
      setUser(null);
    }
  }, []);

  const getUserLogged = useCallback(async () => {
    const response = await getLogged();
    if (response?.holder_key) {
      setUser(response);
      return response;
    }
    return null;
  }, []);

  const value = useMemo(
    () => ({
      user,
      login,
      logout,
      getUserLogged,
    }),
    [getUserLogged, login, logout, user]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export interface IAuthContext {
    user: User | null;
    login: (credentials: UserCredentials) => Promise<User | null>;
    logout: () => Promise<void>;
    getUserLogged: () => Promise<User | null>;
  }
  
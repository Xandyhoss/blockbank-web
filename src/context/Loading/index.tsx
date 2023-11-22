import { createContext, useMemo, useState } from "react";
import { ILoadingContext } from "./Loading";

export const LoadingContext = createContext<ILoadingContext>({
  globalLoading: false,
  localLoading: false,
  defineGlobalLoading: () => {},
  defineLocalLoading: () => {},
});

export const LoadingProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [globalLoading, setGlobalLoading] = useState(false);
  const [localLoading, setLocalLoading] = useState(false);

  const defineGlobalLoading = (isLoading: boolean) => {
    setGlobalLoading(isLoading);
  };

  const defineLocalLoading = (isLoading: boolean) => {
    setLocalLoading(isLoading);
  };
  const value = useMemo(
    () => ({
      globalLoading,
      localLoading,
      defineGlobalLoading,
      defineLocalLoading,
    }),
    [globalLoading, localLoading]
  );

  return (
    <LoadingContext.Provider value={value}>{children}</LoadingContext.Provider>
  );
};

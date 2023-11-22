import { useContext } from "react";
import { LoadingContext } from ".";

export function useLoading() {
  const context = useContext(LoadingContext);
  return context;
}

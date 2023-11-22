export interface ILoadingContext {
  globalLoading: boolean;
  localLoading: boolean;
  defineGlobalLoading: (isLoading: boolean) => void;
  defineLocalLoading: (isLoading: boolean) => void;
}

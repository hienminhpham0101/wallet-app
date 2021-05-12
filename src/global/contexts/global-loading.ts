import { createContext, useContext } from "react";

type LoadingState = "init" | "loading" | "idle";

export const GlobalLoadingContext = createContext<{
  loadingState: LoadingState;
  setLoadingState: (state: LoadingState) => void;
}>({
  loadingState: "init",
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setLoadingState() {},
});
export const GlobalLoadingProvider = GlobalLoadingContext.Provider;
export const GlobalLoadingConsumer = GlobalLoadingContext.Consumer;

export const useGlobalLoading = () => useContext(GlobalLoadingContext);

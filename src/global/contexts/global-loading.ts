import { createContext, useContext } from "react";

type LoadingState = "init" | "loading" | "idle";

export const GlobalLoadingContext = createContext<{
  loadingState: LoadingState;
  setLoadingState: (state: LoadingState) => void;
}>({
  loadingState: "init",
  setLoadingState() {},
});
export const GlobalLoadingProvider = GlobalLoadingContext.Provider;
export const GlobalLoadingConsumer = GlobalLoadingContext.Consumer;

export const useGlobalLoading = () => useContext(GlobalLoadingContext);

import { createContext } from "react";

type LoadingState = "init" | "loading" | "idle";

export const GlobalLoadingContext = createContext<{
  loadingState: LoadingState;
  setLoadingState: (state: LoadingState) => void;
}>({
  loadingState: "init",
  setLoadingState() {},
});
export const GlobalLoadingProvider = GlobalLoadingContext.Provider;

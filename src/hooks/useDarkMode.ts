import { useEffect } from "react";
import useLocalStorage from "./useLocalStorage";
import useMedia from "./useMedia";

function useDarkMode() {
  const [enabledState, setEnabledState] = useLocalStorage(
    "dark-mode-enabled",
    false
  );
  const prefersDarkMode = usePrefersDarkMode();
  const enabled: boolean =
    typeof enabledState !== "undefined" ? enabledState : prefersDarkMode;
  useEffect(() => {
    const className = "dark-mode";
    const element: HTMLElement = window.document.body;
    if (enabled) {
      element.classList.add(className);
    } else {
      element.classList.remove(className);
    }
  }, [enabled]);
  return [enabled, setEnabledState];
}
function usePrefersDarkMode(): boolean {
  return useMedia(["(prefers-color-scheme: dark)"], [true], false);
}
export default useDarkMode;

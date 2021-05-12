import NProgress from "nprogress";
import { useEffect } from "react";

NProgress.configure({
  showSpinner: false,
});

interface ProgressBar {
  showProgress?: boolean;
}

export const ProgressBar = (props: ProgressBar) => {
  const { showProgress } = props;

  useEffect(() => {
    if (showProgress) {
      NProgress.start();

      return () => {
        NProgress.done();
      };
    }
  }, [showProgress]);

  return null;
};

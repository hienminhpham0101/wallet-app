import { useEffect, useState, useMemo } from "react";
export default function useMedia(
  queries: string[],
  values: boolean[],
  defaultValue: boolean
) {
  const [value, setValue] = useState(defaultValue);
  const mediaQueryLists = useMemo(
    () => queries.map((q: string) => window.matchMedia(q)),
    []
  );
  const getValue = () => {
    const index: number = mediaQueryLists.findIndex((mql: any) => mql.matches);
    return typeof values[index] !== "undefined" ? values[index] : defaultValue;
  };
  useEffect(() => {
    setValue(getValue);
    const handler = () => setValue(getValue);
    mediaQueryLists.forEach((mql: MediaQueryList) => mql.addListener(handler));
    return () =>
      mediaQueryLists.forEach((mql: MediaQueryList) =>
        mql.removeListener(handler)
      );
  }, []);
  return value;
}

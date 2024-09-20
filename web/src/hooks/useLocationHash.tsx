import { useCallback, useEffect, useRef, useState } from "react";

const useLocationHash = (defaultValue: string) => {
  const [hash, setHash] = useState(() => window.location.hash || defaultValue);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const hashChangeHandler = useCallback(() => {
    setHash(window.location.hash);
  }, []);

  useEffect(() => {
    window.addEventListener("hashchange", hashChangeHandler);
    return () => {
      window.removeEventListener("hashchange", hashChangeHandler);
    };
  }, [hashChangeHandler]);

  const updateHash = useCallback(
    (newHash: string) => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);

      timeoutRef.current = setTimeout(() => {
        if (newHash !== hash) window.location.hash = newHash;
      }, 100);
    },
    [hash]
  );

  return [hash, updateHash] as const;
};

export default useLocationHash;

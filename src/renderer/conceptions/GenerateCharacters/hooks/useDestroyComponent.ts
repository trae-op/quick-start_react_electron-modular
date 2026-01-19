import { useRef, useEffect } from "react";

export const useDestroyComponent = (destroyCallback: () => void) => {
  const isStartCleanUp = useRef(false);
  useEffect(() => {
    const timer = setTimeout(() => {
      isStartCleanUp.current = true;
    }, 500);
    return function cleanUp() {
      if (isStartCleanUp.current) {
        clearTimeout(timer);
        destroyCallback();
      }
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};

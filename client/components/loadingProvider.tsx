'use client';

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  ReactNode,
} from "react";
import { usePathname } from "next/navigation";
import LoadingOverlay from "./loadingOverlay";

type LoadingCtx = {
  show: (text?: string) => void;
  hide: () => void;
  withLoading: <T>(promise: Promise<T>, text?: string) => Promise<T>;
};

const LoadingContext = createContext<LoadingCtx | null>(null);

export function useLoading(): LoadingCtx {
  const ctx = useContext(LoadingContext);
  if (!ctx) throw new Error("useLoading must be used inside <LoadingProvider>");
  return ctx;
}

export default function LoadingProvider({ children }: { children: ReactNode }) {
  const [active, setActive] = useState(false);
  const [text, setText] = useState<string | undefined>();
  const pathname = usePathname();
  const firstRender = useRef(true);

  const show = useCallback((t?: string) => {
    setText(t);
    setActive(true);
  }, []);

  const hide = useCallback(() => {
    setActive(false);
  }, []);

  const withLoading = useCallback(
    async <T,>(promise: Promise<T>, t?: string): Promise<T> => {
      show(t);
      try {
        return await promise;
      } finally {
        hide();
      }
    },
    [show, hide]
  );

  // Auto-hide once the destination route mounts.
  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    setActive(false);
  }, [pathname]);

  return (
    <LoadingContext.Provider value={{ show, hide, withLoading }}>
      {children}
      {active && <LoadingOverlay text={text} />}
    </LoadingContext.Provider>
  );
}

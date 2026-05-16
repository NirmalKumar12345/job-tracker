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

  // Always-current pathname (refs update synchronously during render).
  const pathnameRef = useRef(pathname);
  pathnameRef.current = pathname;

  // Which path "owns" the current overlay — i.e. which page called show()
  // most recently. If null, no one owns it and an auto-hide is safe.
  const ownerPathRef = useRef<string | null>(null);
  const firstRender = useRef(true);

  const show = useCallback((t?: string) => {
    ownerPathRef.current = pathnameRef.current;
    setText(t);
    setActive(true);
  }, []);

  const hide = useCallback(() => {
    ownerPathRef.current = null;
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

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    const t = setTimeout(() => {
      if (ownerPathRef.current !== pathnameRef.current) {
        ownerPathRef.current = null;
        setActive(false);
      }
    }, 150);
    return () => clearTimeout(t);
  }, [pathname]);

  return (
    <LoadingContext.Provider value={{ show, hide, withLoading }}>
      {children}
      {active && <LoadingOverlay text={text} />}
    </LoadingContext.Provider>
  );
}

"use client";
import { useRef } from "react";
import { Provider } from "react-redux";
import { makeStore, AppStore } from "../../lib/store";
import { getUserFromLocalStorage } from "@/util/helper";
import { setIsLoggedOut, setUser } from "@/lib/slices/data";
// import { initializeCount } from '../../lib/store'

export default function ({ children }: { children: React.ReactNode }) {
  const storeRef = useRef<AppStore | null>(null);
  if (!storeRef.current) {
    storeRef.current = makeStore();
    const user = getUserFromLocalStorage();
    if (!user) {
      storeRef.current.dispatch(setIsLoggedOut());
    } else {
      storeRef.current.dispatch(setUser(user));
    }
  }

  return <Provider store={storeRef.current}>{children}</Provider>;
}

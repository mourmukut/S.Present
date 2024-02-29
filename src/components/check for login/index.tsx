"use client";

import { RootState } from "@/lib/store";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import MyLoader from "../my loader";
import MyError from "../my error";
import MyError2 from "../my error 2";

export default function ({ children,forLoginPage=false }: { children: React.ReactNode,forLoginPage?:boolean }) {
  const [isChecking, setIsChecking] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const dataState = useSelector((state: RootState) => state.data);

  React.useEffect(() => {
    setIsChecking(false);
    setIsLoggedIn(dataState.isLoggedIn);
    console.log("dataState : ", dataState);
  }, [dataState]);

  if (isChecking) {
    return (
      <>
        <MyLoader />
      </>
    );
  }
  if (!isLoggedIn && !forLoginPage) {
    return (
      <>
        <MyError />
      </>
    );
  }
  if(forLoginPage && isLoggedIn){
    return (
        <>
        <MyError2 />

        </>
    )
  }
  return children;
}

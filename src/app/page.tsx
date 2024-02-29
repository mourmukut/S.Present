"use client";
import TreeViewComponent from "@/components/treeview";
import styles from "./page.module.css";
import * as React from "react";
import CheckForLogin from "@/components/check for login";

export default function () {
  return (
    <>
     
        <CheckForLogin>
        <div className={styles.main}>
          <TreeViewComponent />
        </div>
        </CheckForLogin>
    </>
  );
}

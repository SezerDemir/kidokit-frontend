import React from "react"
import { LoginContent } from "./login-content";
import { LoginHeader } from "./login-header";
import styles from "./login-style.module.css"

export function LoginContainer(){
    return(
        <div className={styles["login-container"]}>
            <LoginHeader />
            <LoginContent />
        </div>
    );
}

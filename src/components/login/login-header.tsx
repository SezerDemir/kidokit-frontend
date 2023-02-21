import React from "react";
import styles from "./login-style.module.css"
export function LoginHeader(){
    return(
        <div className={styles["login-header"]}>
            <h1>Giriş Yap</h1>
        </div>
    );
}
import React from "react"
import styles from "./register-style.module.css"

export function RegisterHeader(){
    return(
        <div className={styles["register-header"]}>
            <h1>Kayıt Olun</h1>
        </div>
    );
}
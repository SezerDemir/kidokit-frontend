import React from "react"
import {RegisterContent} from "./register-content"
import {RegisterHeader} from "./register-header"
import styles from "./register-style.module.css"

export function RegisterContainer(){
    return(
        <div className={styles["register-container"]}>
            <RegisterHeader />
            <RegisterContent />
        </div>

    );
}
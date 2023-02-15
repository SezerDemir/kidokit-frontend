import React from "react"
import styles from "./homepage-style.module.css"
import logo from "../../images/Logo.png"


export function HomepageHeader(): JSX.Element {
    return(
        <div className={styles["homepage-header"]}>
            <img src={logo} alt="logo"></img>
        </div>
    );
}
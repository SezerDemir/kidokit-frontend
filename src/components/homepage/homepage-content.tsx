import React from "react"
import { Link } from "react-router-dom";
import styles from "./homepage-style.module.css"

export function HomepageContent(){
    return(
        <div className={styles["homepage-content"]}>
            <h2>Hoş Geldiniz!</h2>
            <p>Çocuğunuzu büyütürken artık yalnız değilsiniz!<br/> Hemen kayıt olup Günlük Plan'a erişin!</p>
            <Link to={"/register"}>
                <button type="button" className={styles["button-sign-up"]}>Kayıt</button> 
            </Link>
            <div className={styles["sign-in-container"]}>
                <p>Zaten bir hesabınız mı var?</p>
                <button type="button" className={styles["button-sign-in"]}>Giriş Yap</button>
            </div>
        </div>
    );
}
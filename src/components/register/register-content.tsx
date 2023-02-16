import React, { useRef, useState } from "react"
import styles from "./register-style.module.css"
import hideLogo from "../../images/hide.png"
export function RegisterContent(){

    const [passwordShown, setPasswordShown] = useState<boolean>(false);
    const [repeatPasswordShown, setRepeatPasswordShown] = useState<boolean>(false);

    const [passwordCharacterCheck, setPasswordCharacterCheck] = useState<boolean>(false);
    const [passwordDigitCheck, setPasswordDigitCheck] = useState<boolean>(false);
    const [passwordSpecialCheck, setPasswordSpecialCheck] = useState<boolean>(false);
    const [passwrodUpperLetterCheck, setPasswrodUpperLetterCheck] = useState<boolean>(false);

    const inputRef = useRef<string>();
    const checkInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        if(e.target.value.length > 7 && e.target.value.length < 31){
            setPasswordCharacterCheck(true);
        }
    }
    
    return(
        <div className={styles["register-content-container"]}>
            <div className={styles["name-box"]}>
                <h1>Adınız ve Soyadınız</h1>
                <input type="text" name="name" className={styles["register-input-text"]} />
            </div>
            <div className={styles["email-box"]}>
                <h1>E-posta adresinizi yazınız</h1>
                <input type="text" name="name" id={styles["email-input"]} className={styles["register-input-text"]} />
            </div>
            <div className={styles["password-box"]}>
                <h1>Bir şifre belirleyiniz</h1>
                <input type={passwordShown ? "text" : "password"} id="password" name="password" className={styles["register-input-text"]} onChange={checkInput} />
                <button type="button" className={styles["hide-button"]} onClick={() => passwordShown ? setPasswordShown(false) : setPasswordShown(true)}></button>
                <ul>
                    <li className={passwordCharacterCheck ? styles["valid-input-text-li"] : styles["invalid-input-text-li"] }>8 ila 30 karakterden oluşmalı</li>
                    <li className={passwordDigitCheck ? styles["valid-input-text-li"] : styles["invalid-input-text-li"] }>En az 1 tane rakam bulunmalı</li>
                    <li className={passwordSpecialCheck ? styles["valid-input-text-li"] : styles["invalid-input-text-li"] }>En az 1 tane özel karakter bulunmalı(örneğin !#$&+)</li>
                    <li className={passwrodUpperLetterCheck ? styles["valid-input-text-li"] : styles["invalid-input-text-li"] }>En az 1 tane büyük harf bulunmalı</li>
                </ul>
            </div>
            <div className={styles["password-repeat-box"]}>
                <h1>Şifreyi tekrar giriniz</h1>
                <input type={repeatPasswordShown ? "text" : "password"} id="password" name="password" className={styles["register-input-text"]}/>
                <button type="button" className={styles["hide-button"]} onClick={() => repeatPasswordShown ? setRepeatPasswordShown(false) : setRepeatPasswordShown(true)}></button>
            </div>
        </div>
    );
}
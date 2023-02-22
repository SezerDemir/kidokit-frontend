import axios, { AxiosError } from "axios";
import React, { ChangeEvent, FormEvent, useState } from "react"
import styles from "./login-style.module.css"

export function LoginContent(){
    const apiUrl: string = process.env.REACT_APP_LOGIN_URL as string;
    const[passwordShow, setPasswordShow] = useState<boolean>(false);
    const[password, setPassword] = useState<string>("");
    const[email, setEmail] = useState<string>("");
    const[showError, setShowError] = useState<boolean>(false);

    const loginErrorMessage: string = "Kullanıcı Bulunamadı";


    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const accountJson: string = JSON.stringify(
            {
                "email" : email,
                "password" : password
            }
        );
        
        loginRequest(apiUrl, accountJson).then((res) => { !res ? setShowError(!res) : setShowError(!res)});
        
    }

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const {id, value} = e.target;
        switch(id){
            case "email":
                setEmail(value);
                break;
            case "pass":
                setPassword(value);
                break;
            default:
                break;
        }
    }


    return(
        <form className={styles["login-content-container"]} onSubmit={handleSubmit} >
            <div className={styles["input-email"]}>
                <label htmlFor="email">E-posta adresinizi yazınız</label>
                <input type="text" id="email" onChange={handleChange}/>
            </div>
            <div className={styles["input-password"]}>
                <label htmlFor="pass">Şifrenizi Giriniz</label>
                <input type={passwordShow ? "text" : "password"} onChange={handleChange} id="pass"/>
                <button type="button" onClick={() => setPasswordShow(passwordShow ? false : true)}></button>
            </div>
            <button type="submit" className={styles["button-submit"]}>Giriş Yap</button>
            { showError ? <ErrorMessage /> : null}
        </form>
    );

}

function ErrorMessage() {
    return(
        <div className={styles["error-message-div"]}>
            <p>Kullanıcı bulunamadı</p>
        </div>
    );

}

async function loginRequest(url: string, data: string) {
    try{
        const res = await axios.post(
            url,
            data,
            {headers: {'Content-Type': 'application/json'}}
        )
        sessionStorage.setItem("userId", res.data.userId);
        sessionStorage.setItem("accessToken", res.data.accessToken);
        sessionStorage.setItem("refreshToken", res.data.refreshToken);
        window.location.replace("/welcome");
    }catch(error){
        return false;
    }
    return true;
}
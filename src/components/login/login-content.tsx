import axios from "axios";
import React, { ChangeEvent, FormEvent, useState } from "react"
import styles from "./login-style.module.css"

export function LoginContent(){
    const apiUrl: string = process.env.REACT_APP_LOGIN_URL as string;
    const[passwordShow, setPasswordShow] = useState<boolean>(false);
    const[password, setPassword] = useState<string>("");
    const[email, setEmail] = useState<string>("");


    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const jsonString: string = JSON.stringify(
            {
                "email" : email,
                "password" : password
            }
        );

        console.log(password + " " +  email + " " + apiUrl);
        axios.post(
            apiUrl,
            jsonString,
            {headers: {'Content-Type': 'application/json'}}
        ).then(response => {
            console.log(response)});

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
        </form>
    );

}
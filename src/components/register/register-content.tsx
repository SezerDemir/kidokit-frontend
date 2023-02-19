import React, { useRef, useState, FormEvent } from "react"
import styles from "./register-style.module.css"
import warningLogo from "../../images/warningSign.png"
import axios from "axios"

export function RegisterContent(){
    const apiRegisterAdress: string = "https://api.kidokit.com/api/account/v2/register";

    //error messages
    const fullNameErrorMessage: string = "Geçerli bir ad ve soyad girmelisiniz";
    const emailErrorMessage: string = "Geçerli bir e-mail adresi girmelisiniz";
    const passwordErrorMessage: string = "Geçerli bir şifre girmelisiniz";
    const childNameErrorMessage: string = "Geçerli bir çocuk adı girmelisiniz";
    const childBirthdayErrorMessage: string = "Geçerli bir doğum tarihi girmelisiniz";
    const agreementErrorMessage: string = "Anlaşma koşullarını kabul etmelisiniz";

    const [passwordShown, setPasswordShown] = useState<boolean>(false);
    const [repeatPasswordShown, setRepeatPasswordShown] = useState<boolean>(false);
    const [passwordCharacterCheck, setPasswordCharacterCheck] = useState<boolean>(false);
    const [passwordDigitCheck, setPasswordDigitCheck] = useState<boolean>(false);
    const [passwordSpecialCheck, setPasswordSpecialCheck] = useState<boolean>(false);
    const [passwrodUpperCaseCheck, setPasswrodUpperCaseCheck] = useState<boolean>(false);

    enum Gender{
        male, female, none
    }
    const[kidGender, setKidGender] = useState<Gender>(Gender.none);
    const changeButtonColor = (b1: HTMLElement | null, b2: HTMLElement | null)  => {
        if(b1 !== null && b2 !== null){
            b1.style.borderColor = "#735EBB";
            b2.style.borderColor = "black";
        }     
    }

    const specialCharacters: RegExp = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/
    const upperCaseCharacters: RegExp = /[A-Z]/

    const year = (new Date()).getFullYear();
    const years = Array.from(new Array(40),( val, index) => year - index);

    const validateEmail = (email: string) => {
        return /\S+@\S+\.\S+/.test(email);
    }

    const validateFullName = (fullName: string) => {
        return /^[a-zA-Z]+ [a-zA-Z]+$/.test(fullName);
    }

    const validateName = (name: string) => {
        return /^[a-zA-Z]+$/.test(name);
    }

    const validatePassword = () => {
        const firstPassword = (document.getElementById("input-password") as HTMLInputElement).value;
        const secondPassword = (document.getElementById("input-repeat-password") as HTMLInputElement).value;
        return passwordCharacterCheck && passwordDigitCheck && passwordSpecialCheck && passwrodUpperCaseCheck
        && (firstPassword === secondPassword);
    }


    const checkInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        if(e.target.value.length > 7 && e.target.value.length < 31){
            setPasswordCharacterCheck(true);
        }
        else{
            setPasswordCharacterCheck(false);
        }

        if(/[0-9]/.test(e.target.value)){
            setPasswordDigitCheck(true);
        }
        else{
            setPasswordDigitCheck(false);
        }

        if(specialCharacters.test(e.target.value)){
            setPasswordSpecialCheck(true);
        }
        else{
            setPasswordSpecialCheck(false);
        }

        if(upperCaseCharacters.test(e.target.value)){
            setPasswrodUpperCaseCheck(true);
        }
        else{
            setPasswrodUpperCaseCheck(false);
        }

    }

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        //gets and validates input values

        //gets name
        const fullName: string = (document.getElementById("input-name") as HTMLInputElement).value;
        const nameCheck: boolean = validateFullName(fullName); 

        //gets email
        const email: string = (document.getElementById("input-email") as HTMLInputElement).value;
        const emailCheck: boolean = validateEmail(email);

        //gets password
        const password: string = (document.getElementById("input-password") as HTMLInputElement).value;
        const passwordCheck: boolean = validatePassword();

        //gets kid's name
        const childName: string = (document.getElementById("input-kid-name") as HTMLInputElement).value;
        const childNameCheck: boolean = validateName(childName);

        //gets birth date
        const childBirthDay: string = (document.getElementById("input-date") as HTMLInputElement).value;
        const childBirthDayCheck: boolean = (childBirthDay !== "") ? true : false;

        //gets gender
        const childGender: string = kidGender.toString();
        const childGenderCheck: boolean = (Gender.none !== kidGender) ? true : false;

        //gets agreement
        const agreement: boolean = (document.getElementById("agreement-checkbox") as HTMLInputElement).checked;

        if(nameCheck && emailCheck && passwordCheck && childNameCheck && childBirthDayCheck && childGenderCheck && agreement){
            const jsonString: string = JSON.stringify(
                {
                    "fullName" : fullName,
                    "email" : email,
                    "password" : password,
                    "childName" : childName,
                    "childBirthday" : childBirthDay,
                    "childGender" : childGender
                }
            );
            axios.post(apiRegisterAdress, jsonString, {headers: {'Content-Type': 'application/json'}})
                .then(response => {
                    console.log(response)
                })
        }
        else{
            const errorMessage: string = 
                (nameCheck ? "" : fullNameErrorMessage) + "\n" + 
                (emailCheck ? "" : emailErrorMessage) + "\n" + 
                (passwordCheck ? "" : passwordErrorMessage) + "\n" + 
                (childNameCheck ? "" : childNameErrorMessage) + "\n" + 
                (childBirthDayCheck ? "" : childBirthdayErrorMessage) + "\n" + 
                (agreement ? "" : agreementErrorMessage) + "\n";
            alert(errorMessage);
        }
    }
    
    return(
        <form className={styles["register-content-container"]} onSubmit={handleSubmit}>
            <div className={styles["name-cell"]}>
                <h1>Adınız ve Soyadınız</h1>
                <input type={"text"} id="input-name" />
            </div>

            <div className={styles["email-cell"]}>
                <h1>Eposta adresinizi yazınız</h1>
                <input type={"text"} id="input-email" />
            </div>
            
            <div className={styles["password-cell"]}>
                <h1>Bir şifre belirleyiniz</h1>
                <input type={passwordShown ? "text" : "password"} onChange={checkInput} id="input-password"/>
                <button type="button" onClick={() => {passwordShown ? setPasswordShown(false) : setPasswordShown(true)}}></button>
   
                <ul>
                    <li className={styles[passwordCharacterCheck ? "valid-li" : "invalid-li"]}>8 ila 30 karakterden oluşmalı</li>
                    <li className={styles[passwordDigitCheck ? "valid-li" : "invalid-li"]}>En az 1 tane rakam bulunmalı</li>
                    <li className={styles[passwordSpecialCheck ? "valid-li" : "invalid-li"]}>En az 1 tane özel karakter bulunmalı(Örneğin #!?&%)</li>
                    <li className={styles[passwrodUpperCaseCheck ? "valid-li" : "invalid-li"]}>En az 1 tane büyük harf bulunmalı</li>
                </ul>
            </div>
                
            <div className={styles["repeat-password-cell"]}>
                <h1>Bir şifre belirleyiniz</h1>
                <input type={repeatPasswordShown ? "text" : "password"} id="input-repeat-password" />
                <button type="button" onClick={() => {repeatPasswordShown ? setRepeatPasswordShown(false) : setRepeatPasswordShown(true)}}></button>
            </div>

            <div className={styles["kid-name-cell"]}>
                <h1>Çocuğun ismi?</h1>
                <input type="text" id="input-kid-name"/>
            </div>

            <div className={styles["kid-birthday-cell"]}>
                <h1>Çocuğun Doğum Tarihi?</h1>
                <input type={"date"} id="input-date"></input>
            </div>

            <div className={styles["kid-gender-cell"]}>
                <h1>Çocuğunuzun cinsiyeti</h1>
                <button type="button" className={styles["button-male"]} id="male-button" onClick={() => 
                    {
                        setKidGender(Gender.male);
                        changeButtonColor(document.getElementById("male-button"), document.getElementById("female-button"));
                    }
                   }>Erkek</button>
                <button type="button" className={styles["button-female"]} id="female-button" onClick={() => 
                    {
                        setKidGender(Gender.female);
                        changeButtonColor(document.getElementById("female-button"), document.getElementById("male-button"));
                    }
                    }>Kız</button>
            </div>
            
            <div className={styles["warning-cell"]}>
                <img src={warningLogo}></img>
                <p>Kayıt sonrası yeni çocuk kayıtları oluşturabilirsiniz.</p>
            </div>

            <div className={styles["agreement-cell"]}>
                <div className={styles["agreement-item"]}>
                    <input type="checkbox" id="agreement-checkbox"></input>
                    <p><a href="">Kullanım Koşullarını ve Gizlilik Sözleşmesini</a> okudum, kabul ediyorum.</p>
                </div>
                
            </div>
            <div className={styles["submit-cell"]}>
                <button type="submit" >Kayıt Ol</button>
            </div>
   
        </form>
        
    );
}


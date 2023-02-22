import React, { useState, FormEvent, ChangeEvent, useEffect } from "react"
import styles from "./register-style.module.css"
import warningLogo from "../../images/warningSign.png"
import axios from "axios"
import { Link } from "react-router-dom";

export function RegisterContent(){
    const apiRegisterAdress: string = process.env.REACT_APP_REGISTER_URL as string;

    //error messages
    const fullNameErrorMessage: string = "Geçerli bir ad ve soyad girmelisiniz";
    const emailErrorMessage: string = "Geçerli bir e-mail adresi girmelisiniz";
    const passwordErrorMessage: string = "Geçerli bir şifre girmelisiniz";
    const repeatPasswordErrorMessage: string = "Tekrarlana şifre ilk şifre ile aynı olmalıdır"
    const childNameErrorMessage: string = "Geçerli bir çocuk adı girmelisiniz";
    const childBirthdayErrorMessage: string = "Geçerli bir doğum tarihi girmelisiniz";
    const agreementErrorMessage: string = "Anlaşma koşullarını kabul etmelisiniz";
    const childGenderErrorMessage: string = "Bir cinsiyet seçiniz";

    const [passwordShown, setPasswordShown] = useState<boolean>(false);
    const [repeatPasswordShown, setRepeatPasswordShown] = useState<boolean>(false);
    const [passwordCharacterCheck, setPasswordCharacterCheck] = useState<boolean>(false);
    const [passwordDigitCheck, setPasswordDigitCheck] = useState<boolean>(false);
    const [passwordSpecialCheck, setPasswordSpecialCheck] = useState<boolean>(false);
    const [passwrodUpperCaseCheck, setPasswrodUpperCaseCheck] = useState<boolean>(false);

    const [fullName, setFullName] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [repeatPassword, setRepeatPassword] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [childName, setChildName] = useState<string>("");
    const [childBirthday, setChildBirthday] = useState<string>("");

    const[nameInputStyle, setNameInputStyle] = useState<string>("");
    const[emailInputStyle, setEmailInputStyle] = useState<string>("");
    const[passwordInputStyle, setPasswordInputStyle] = useState<string>("");
    const[repeatPasswordInputStyle, setRepeatPasswordInputStyle] = useState<string>("");
    const[childNameInputStyle, setChildNameInputStyle] = useState<string>("");
    const[childBirthdayInputStyle, setChildBirthdayInputStyle] = useState<string>("");
    const[childGenderMaleInputStyle, setChildGenderMaleInputStyle] = useState<string>("");
    const[childGenderFemaleInputStyle, setChildGenderFemaleInputStyle] = useState<string>("");
    const[agreementInputStyle, setAgreementInputStyle] = useState<string>("");

    // error effects for input fields
    useEffect( () => {
        const timer = setTimeout(() => {
            setNameInputStyle("");
            setEmailInputStyle("");
            setPasswordInputStyle("");
            setRepeatPasswordInputStyle("");
            setChildNameInputStyle("");
            setChildBirthdayInputStyle("");
            setChildGenderMaleInputStyle("");
            setChildGenderFemaleInputStyle("");
            setAgreementInputStyle("");
        }, 1000);
        return () => clearTimeout(timer);
    }, [nameInputStyle, emailInputStyle, passwordInputStyle, repeatPasswordInputStyle,
        childNameInputStyle, childBirthdayInputStyle, childGenderMaleInputStyle, childGenderFemaleInputStyle, agreementInputStyle]);

    enum Gender{
        female = 0, male = 1, none = 2
    }
    const[childGender, setChildGender] = useState<Gender>(Gender.none);
    const changeButtonColor = (b1: HTMLElement | null, b2: HTMLElement | null)  => {
        if(b1 !== null && b2 !== null){
            b1.style.borderColor = "#735EBB";
            b2.style.borderColor = "black";
        }     
    }

    const specialCharacters: RegExp = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/
    const upperCaseCharacters: RegExp = /[A-Z]/

    const validateEmail = () => {
        return /\S+@\S+\.\S+/.test(email);
    }
    const validateFullName = () => {
        return /^[a-zA-ZşŞıİçÇöÖüÜĞğ]+ [a-zA-ZşŞıİçÇöÖüÜĞğ]+$/.test(fullName);
    }
    const validateName = () => {
        return /^[a-zA-ZşŞıİçÇöÖüÜĞğ]+$/.test(childName);
    }

    const validatePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
        handleInputChange(e);
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

    const checkPassword = () => {
        return passwordCharacterCheck && passwordDigitCheck && passwordSpecialCheck && passwrodUpperCaseCheck;
    }

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const {id, value} = e.target;
        switch(id){
            case "input-name":
                setFullName(value);
                break;
            case "input-password":
                setPassword(value);
                break;
            case "input-email":
                setEmail(value);
                break;
            case "input-repeat-password":
                setRepeatPassword(value);
                break;
            case "input-kid-name":
                setChildName(value);
                break;
            case "input-date":
                setChildBirthday(value);
                break;
            default:
                break;
        }
    }

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        //validates input values
        const nameCheck: boolean = validateFullName(); 
        const emailCheck: boolean = validateEmail();
        const passwordCheck: boolean = checkPassword(); 
        const childNameCheck: boolean = validateName();
        const childBirthDayCheck: boolean = (childBirthday !== "") ? true : false;
        const childGenderCheck: boolean = (Gender.none !== childGender) ? true : false;
        const agreement: boolean = (document.getElementById("agreement-checkbox") as HTMLInputElement).checked;
        const repeatCheck: boolean = (password===repeatPassword && repeatPassword !== "" ? true:false);

        console.log(fullName + " " + email + " " + password + " " + repeatPassword);
        console.log(nameCheck + " " + emailCheck + " " + passwordCheck + " " + repeatCheck);

        if(nameCheck && emailCheck && passwordCheck && repeatCheck && childNameCheck && childBirthDayCheck && childGenderCheck && agreement){
            const jsonString: string = JSON.stringify(
                {
                    "fullName" : fullName,
                    "email" : email,
                    "password" : password,
                    "childName" : childName,
                    "childBirthday" : childBirthday,
                    "childGender" : childGender
                }
            );
            registerRequest(apiRegisterAdress, jsonString);
            
            alert("Successfully Registered");
            //window.location.replace("/");
        }
        else{
            if(!nameCheck) setNameInputStyle("input-warning-color-switch");
            if(!emailCheck) setEmailInputStyle("input-warning-color-switch");
            if(!passwordCheck) setPasswordInputStyle("input-warning-color-switch");
            if(!repeatCheck) setRepeatPasswordInputStyle("input-warning-color-switch");
            if(!childNameCheck) setChildNameInputStyle("input-warning-color-switch");
            if(!childBirthDayCheck) setChildBirthdayInputStyle("input-warning-color-switch");
            if(!childGenderCheck) {
                setChildGenderMaleInputStyle("input-warning-color-switch");
                setChildGenderFemaleInputStyle("input-warning-color-switch");
            }
            if(!agreement){
                setAgreementInputStyle("input-warning-color-switch");
                console.log("here");
            } 
            /* const errorMessage: string = 
                (nameCheck ? "" : fullNameErrorMessage + "\n") + 
                (emailCheck ? "" : emailErrorMessage + "\n") + 
                (passwordCheck ? "" : passwordErrorMessage + "\n") + 
                (repeatPassword ? "" : repeatPasswordErrorMessage + "\n") + 
                (childNameCheck ? "" : childNameErrorMessage + "\n") + 
                (childBirthDayCheck ? "" : childBirthdayErrorMessage + "\n") + 
                (childGenderCheck ? "" : childGenderErrorMessage + "\n") + 
                (agreement ? "" : agreementErrorMessage);
            alert(errorMessage); */
        }
    }
    
    return(
        <form className={styles["register-content-container"]} onSubmit={handleSubmit}>
            <div className={styles["name-cell"]}>
                <h1>Adınız ve Soyadınız</h1>
                <input type={"text"} id="input-name" className={styles[nameInputStyle]} onChange={handleInputChange}/>
            </div>

            <div className={styles["email-cell"]}>
                <h1>Eposta adresinizi yazınız</h1>
                <input type={"text"} id="input-email" className={styles[emailInputStyle]} onChange={handleInputChange}/>
            </div>
            
            <div className={styles["password-cell"]}>
                <h1>Bir şifre belirleyiniz</h1>
                <input type={passwordShown ? "text" : "password"} className={styles[passwordInputStyle]} onChange={validatePassword} id="input-password"/>
                <button type="button" onClick={() => {passwordShown ? setPasswordShown(false) : setPasswordShown(true)}}></button>
   
                <ul>
                    <li className={styles[passwordCharacterCheck ? "valid-li" : "invalid-li"]}>8 ila 30 karakterden oluşmalı</li>
                    <li className={styles[passwordDigitCheck ? "valid-li" : "invalid-li"]}>En az 1 tane rakam bulunmalı</li>
                    <li className={styles[passwordSpecialCheck ? "valid-li" : "invalid-li"]}>En az 1 tane özel karakter bulunmalı(Örneğin #!?&%)</li>
                    <li className={styles[passwrodUpperCaseCheck ? "valid-li" : "invalid-li"]}>En az 1 tane büyük harf bulunmalı</li>
                </ul>
            </div>
                
            <div className={styles["repeat-password-cell"]}>
                <h1>Şifreyi tekrar giriniz</h1>
                <input type={repeatPasswordShown ? "text" : "password"} className={styles[repeatPasswordInputStyle]} id="input-repeat-password" 
                    onChange={handleInputChange}
                    onPaste={() => {console.log(navigator.clipboard.readText())}}
                />
                <button type="button" onClick={() => {repeatPasswordShown ? setRepeatPasswordShown(false) : setRepeatPasswordShown(true)}}></button>
            </div>

            <div className={styles["kid-name-cell"]}>
                <h1>Çocuğun ismi?</h1>
                <input type="text" id="input-kid-name" className={styles[childNameInputStyle]} onChange={handleInputChange}/>
            </div>

            <div className={styles["kid-birthday-cell"]}>
                <h1>Çocuğun Doğum Tarihi?</h1>
                <input type={"date"} id="input-date" className={styles[childBirthdayInputStyle]} onChange={handleInputChange} />
            </div>

            <div className={styles["kid-gender-cell"]}>
                <h1>Çocuğunuzun cinsiyeti</h1>
                <button type="button" className={styles["button-male"] + " " + styles[childGenderMaleInputStyle]} id="male-button" onClick={() => 
                    {
                        setChildGender(Gender.male);
                        changeButtonColor(document.getElementById("male-button"), document.getElementById("female-button"));
                    }
                   }>Erkek</button>
                <button type="button" className={styles["button-female"] + " " + styles[childGenderFemaleInputStyle]} id="female-button" onClick={() => 
                    {
                        setChildGender(Gender.female);
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
                    <input type="checkbox" id="agreement-checkbox" className={styles[agreementInputStyle]}></input>
                    <p><a href="">Kullanım Koşullarını ve Gizlilik Sözleşmesini</a> okudum, kabul ediyorum.</p>
                </div>
                
            </div>
            <div className={styles["submit-cell"]}>
                <button type="submit" >Kayıt Ol</button>
            </div>
   
        </form>
        
    );
}

async function registerRequest(api: string, requestBody: string){
    await axios.post(api, requestBody, {headers: {'Content-Type': 'application/json'}})
                .then(response => {
                    console.log(response)
                });
}

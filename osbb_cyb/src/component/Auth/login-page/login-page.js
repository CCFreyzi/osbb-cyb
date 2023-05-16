import s from "./loginPage.module.scss"
import React, {useState} from "react";
import {
    createUserWithEmailAndPassword, signInWithEmailAndPassword,
    signInWithPopup,
} from "firebase/auth"
import {db} from "../../../firebase-config";
import {collection, doc, setDoc} from "firebase/firestore"

import {auth, googleProvider} from "../../../firebase-config";


const LoginPage = () => {

    const [registerEmail, setRegisterEmail] = useState("");
    const [registerPassword, setRegisterPassword] = useState("");
    const [name, setName] = useState('')

    const [loginEmail, setLoginEmail] = useState("");
    const [loginPassword, setLoginPassword] = useState("");

    const usersCollectionRef = collection(db, "users")

    const [active, toggleActive] = useState(false)
    const toggleFormBox = () => {
        toggleActive(!active)
    }

    const onsubmitUser = async (uid, user = name) => {
        try {
            await setDoc(
                doc(usersCollectionRef, `${uid}`),
                {name: user, surName: '', city: '', street: '', phonenumber: '', apartmentnumber: '', group: ''}
            )
        } catch (err) {
            console.error(err)
        }
    }

    const signInWithGoogle = async () => {
        try {
            await signInWithPopup(auth, googleProvider)
        } catch (err) {
            console.error(err)
        }

    }

    const signUpWithGoogle = async () => {
        try {
            await signInWithPopup(auth, googleProvider).then(response => {
                onsubmitUser(response.user.uid, response.user.displayName)
            })
        } catch (err) {
            console.error(err)
        }

    }

    const register = async () => {
        try {
            const user = await createUserWithEmailAndPassword(
                auth,
                registerEmail,
                registerPassword
            ).then(respon => {
                onsubmitUser(respon.user.uid)
            })
            setRegisterPassword('')
            setRegisterEmail('')
            setName('')
        } catch (error) {
            console.log(error);
        }
    };

    const login = async () => {
        try {
            const user = await signInWithEmailAndPassword(
                auth,
                loginEmail,
                loginPassword
            );
            setLoginEmail('');
            setLoginPassword('')

        } catch (error) {
            console.log(error.message);
            alert('Email or Password - invalid!')
        }
    };

    return <div className={`${s.wrapper}` + ' ' + `${active ? s.active : ''}`}>
        <div className={s.container}>
            <div className={s.block}>
                <section className={`${s.block_item} + ' ' + ${s.item}`}>
                    <h2 className={s.block_item_title}>У вас вже є обліковий запис?</h2>
                    <button className={s.block_item_btn} onClick={toggleFormBox}>Увійти</button>
                </section>
                <section className={`${s.block_item} + ' ' + ${s.item}`}>
                    <h2 className={s.block_item_title}>У вас немає облікового запису?</h2>
                    <button className={s.block_item_btn} onClick={toggleFormBox}>Зареєструватися</button>
                </section>
            </div>

            <div className={`${s.form_box}` + ' ' + `${active ? s.active : ''}`}>
                <div className={s.form + ' ' + s.form_signin}>
                    <h3 className={s.form_title}>Вхід</h3>

                    <p>
                        <input value={loginEmail} type={"email"} className={s.form_input} placeholder={'Email'}
                               onChange={(event) => {
                                   setLoginEmail(event.target.value);
                               }}/>
                    </p>

                    <p>
                        <input value={loginPassword} type={"text"} className={s.form_input} placeholder={'Пароль'}
                               onChange={(event) => {
                                   setLoginPassword(event.target.value);
                               }}/>
                    </p>

                    <p className={s.form_google_btn}>
                        <button className={s.form_btn} onClick={login}>Вхід</button>
                        <button className={s.form_btn} onClick={signInWithGoogle}>Google</button>
                    </p>


                </div>

                <div className={s.form + " " + s.form_signup}>
                    <h3 className={s.form_title}>Реєстрація</h3>

                    <p>
                        <input value={name} type={"text"} className={s.form_input} placeholder={'Ім\'я'}
                               onChange={(event) => {
                                   setName(event.target.value);
                               }}/>
                    </p>

                    <p>
                        <input value={registerEmail} type={"email"} className={s.form_input} placeholder={'Email'}
                               onChange={(event) => {
                                   setRegisterEmail(event.target.value);
                               }}/>
                    </p>

                    <p>
                        <input value={registerPassword} type={"password"} className={s.form_input}
                               placeholder={'Пароль'} onChange={(event) => {
                            setRegisterPassword(event.target.value);
                        }}/>
                    </p>

                    <p>
                        <button className={`${s.form_btn}` + ' ' + `${s.reg_btn}`} onClick={register}>Зареєструватися
                        </button>
                        <button className={s.form_btn + ' ' + `${s.reg_btn}`} onClick={signUpWithGoogle}>Google</button>

                    </p>


                </div>
            </div>
        </div>
    </div>
}

export default LoginPage;
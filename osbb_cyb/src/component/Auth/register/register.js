import {useEffect, useState} from "react";
import {
    createUserWithEmailAndPassword,
    signInWithPopup,
    signOut
} from "firebase/auth"
import {db} from "../../../firebase-config";
import {addDoc, collection, doc, setDoc} from "firebase/firestore"

import {auth, googleProvider} from "../../../firebase-config";
import {setAnotherData, setEmailAndUid} from "../../../store/slice/auth-slice";
import {useDispatch, useSelector} from "react-redux";

const Register = () => {
    const dispatch = useDispatch()
    const email = useSelector(state => state.auth.email);
    // const uid = useSelector(state => state.auth.id);

    const [registerEmail, setRegisterEmail] = useState("");
    const [registerPassword, setRegisterPassword] = useState("");

    const [name, setName] = useState("");
    const [surName, setSurName] = useState("");
    const [age, setAge] = useState(0);

    const usersCollectionRef = collection(db, "users")

    const onsubmitUser = async (uid) => {
        try {
            // await addDoc(usersCollectionRef, {name, surName, age})
            await setDoc(doc(usersCollectionRef, `${uid}`), {name, surName, age})

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
    const logout = async () => {
        dispatch(setEmailAndUid({email: '', id: ''}))
        dispatch(setAnotherData({name:'', surname: '', age: 0}))
        await signOut(auth);

    };

    const register = async () => {
        try {
            const user = await createUserWithEmailAndPassword(
                auth,
                registerEmail,
                registerPassword
            ). then(respon => {
                onsubmitUser(respon.user.uid)
            })
        } catch (error) {
            console.log(error.message);
        }
    };


    return (
        <div>
            <div>
                <h3> Register User </h3>
                <input
                    placeholder="Email..."
                    onChange={(event) => {
                        setRegisterEmail(event.target.value);
                    }}
                />
                <input
                    placeholder="Password..."
                    onChange={(event) => {
                        setRegisterPassword(event.target.value);
                    }}
                />
                <button onClick={register}> Create User</button>

                <div>
                    <input
                        placeholder="Name..."
                        onChange={(event) => {
                            setName(event.target.value);
                        }}
                    />

                    <input
                        placeholder="Surname..."
                        onChange={(event) => {
                            setSurName(event.target.value);
                        }}
                    />
                    <input
                        placeholder="Age..."
                        onChange={(event) => {
                            setAge(Number(event.target.value));
                        }}
                    />
                </div>


            </div>
            <button onClick={signInWithGoogle}>Sign up with google</button>

            <div>
                {email}
                <button onClick={logout}> Sign Out</button>
            </div>
        </div>
    )
}

export default Register;
import {useEffect, useState} from "react";
import {createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut} from "firebase/auth"
import {auth} from "../../../firebase-config";
import {setData} from "../../../store/slice/auth-slice";
import {useDispatch, useSelector} from "react-redux";

const Register = () => {
    const dispatch = useDispatch()
    const email = useSelector(state => state.auth.email)

    const [registerEmail, setRegisterEmail] = useState("");
    const [registerPassword, setRegisterPassword] = useState("");

    const [loginEmail, setLoginEmail] = useState("");
    const [loginPassword, setLoginPassword] = useState("");

    const [user, setUser] = useState({});
    //
    // useEffect(() => {
    //     onAuthStateChanged(auth, (currentUser) => {
    //         console.log()
    //         setUser(currentUser);
    //         dispatch(setData({email: currentUser.email}))
    //
    //     });
    // }, [])
    const logout = async () => {
        dispatch(setData({email: null}))
        await signOut(auth);
    };

    const register = async () => {
        try {
            const user = await createUserWithEmailAndPassword(
                auth,
                registerEmail,
                registerPassword
            );
            console.log(user);
        } catch (error) {
            console.log(error.message);
        }
    };
    const login = async () => {
        try {
            const user = await signInWithEmailAndPassword(
                auth,
                loginEmail,
                loginPassword
            );
            console.log(user);
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


            </div>
            <div>
                <h3> Login </h3>
                <input
                    placeholder="Email..."
                    onChange={(event) => {
                        setLoginEmail(event.target.value);
                    }}
                />
                <input
                    placeholder="Password..."
                    onChange={(event) => {
                        setLoginPassword(event.target.value);
                    }}
                />

                <button onClick={login}> Login</button>
            </div>
            {email}
            <button onClick={logout}> Sign Out</button>

        </div>
    )
}

export default Register;
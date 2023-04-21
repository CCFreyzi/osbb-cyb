import {useState} from "react";
import {signInWithEmailAndPassword, signInWithPopup, signOut} from "firebase/auth";
import {auth, googleProvider} from "../../../firebase-config";
import {setAnotherData, setEmailAndUid} from "../../../store/slice/auth-slice";
import {useDispatch, useSelector} from "react-redux";

const Login = () => {
    const email = useSelector(state => state.auth.email)


    const [loginEmail, setLoginEmail] = useState("");
    const [loginPassword, setLoginPassword] = useState("");

    const dispatch = useDispatch()

    const login = async () => {
        try {
            const user = await signInWithEmailAndPassword(
                auth,
                loginEmail,
                loginPassword
            );
        } catch (error) {
            console.log(error.message);
        }
    };

    const logout = async () => {
        dispatch(setEmailAndUid({email: '', id: ''}))
        dispatch(setAnotherData({name:'', surname: '', age: 0}))
        await signOut(auth);
    };

    const signInWithGoogle = async () => {
        try {
            await signInWithPopup(auth, googleProvider)
        } catch (err) {
            console.error(err)
        }

    }

    return (
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
            <div>

                <button onClick={signInWithGoogle}>Sign up with google</button>
            </div>
            <div>
                {email}
                <button onClick={logout}> Sign Out</button>
            </div>
        </div>


    )
}

export default Login;
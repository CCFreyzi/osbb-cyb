import s from "../../Profile/profile.module.scss";
import {setAnotherData, setAuth, setEmailAndUid} from "../../../store/slice/auth-slice";
import {signOut} from "firebase/auth";
import {auth, db} from "../../../firebase-config";
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {doc, updateDoc} from "firebase/firestore";

const Prof = () => {
    const dispatch = useDispatch()

    const uid = useSelector(state => state.auth.id)

    const user_name = useSelector(state => state.auth.name);
    const [name, setName] = useState('');

    const user_surname = useSelector(state => state.auth.surname);
    const [surname, setSurname] = useState('')

    const user_city = useSelector(state => state.auth.city);
    const [city, setCity] = useState('')

    const user_street = useSelector(state => state.auth.street);
    const [street, setStreet] = useState('')

    const user_phonenumber = useSelector(state => state.auth.phonenumber);
    const [phonenumber, setPhonenumber] = useState('')

    const user_apartmentnumber = useSelector(state => state.auth.apartmentnumber);
    const [apartmentnumber, setApartmentnumber] = useState('')

    useEffect(() => {
        setName(user_name)
        setSurname(user_surname)
        setCity(user_city)
        setStreet(user_street)
        setPhonenumber(user_phonenumber)
        setApartmentnumber(user_apartmentnumber)
    }, [user_name])
    const logout = async () => {
        dispatch(setEmailAndUid({email: '', id: ''}));
        dispatch(setAnotherData({name: '', surname: '', age: 0, city: '', street: '', phonenumber: '', apartmentnumber: ''}));
        dispatch(setAuth(false))
        await signOut(auth);
    };

    const updateNameAndSurname = async () => {
        const movieDoc = doc(db, "users", uid)
        await updateDoc(movieDoc, {name: name, surName: surname, age: '123', city: city, street: street, phonenumber: phonenumber, apartmentnumber: apartmentnumber})
        dispatch(setAnotherData({name: name, surname: surname, age: '123', city: city, street: street, phonenumber: phonenumber, apartmentnumber: apartmentnumber}))
    }

    return (
        <div className={s.wrapper}>
            <p className={s.profile_title}>My profile</p>
            <div className={s.maininfo}>
                <div className={s.img_section}>
                    <div className={s.img_container}>
                        <img src={'https://cdn-icons-png.flaticon.com/512/456/456283.png'} className={s.user_img}
                             alt={'user'}/>
                    </div>
                    <div className={s.select_btn}>
                        Змінити зображення
                    </div>

                </div>
                <div className={s.info_section}>
                    <div className={s.form}>
                        <input
                            type="text"
                            value={name}
                            onChange={event => setName(event.target.value)}
                            className={s.input_name}
                            placeholder="Ім'я"
                        />

                        <input
                            type="email"
                            value={surname}
                            onChange={event => setSurname(event.target.value)}
                            className={s.input_email}
                            placeholder="Фамілія"
                        />

                        <div className={s.select_btn} onClick={updateNameAndSurname}>
                            Зберегти
                        </div>
                    </div>

                </div>

            </div>
            <div className={s.info}>
                <div className={s.form}>

                    <input
                        type="text"
                        value={city}
                        onChange={event => setCity(event.target.value)}
                        className={s.input_email}
                        placeholder="Місто"
                    />

                    <input
                        type="text"
                        value={street}
                        onChange={event => setStreet(event.target.value)}
                        className={s.input_email}
                        placeholder="Вулиця"
                    />

                    <input
                        type="text"
                        value={phonenumber}
                        onChange={event => setPhonenumber(event.target.value)}
                        className={s.input_name}
                        placeholder="Номер телефону"
                    />

                    <input
                        type="text"
                        value={apartmentnumber}
                        onChange={event => setApartmentnumber(event.target.value)}
                        className={s.input_email}
                        placeholder="Номер квартири"
                    />

                    <div className={s.select_btn} onClick={updateNameAndSurname}>
                        Зберегти зміни
                    </div>

                    <div className={s.select_btn + ' ' + s.exit_btn} onClick={logout}>
                        Вихід
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Prof;
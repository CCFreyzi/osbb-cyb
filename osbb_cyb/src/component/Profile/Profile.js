import s from './profile.module.scss'

const Profile = () => {

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

                        <input type="text" id="name" name="name" className={s.input_name} placeholder="Ім'я"/>

                        <input type="email" id="email" name="email" className={s.input_email} placeholder="Фамілія"/>

                        <div className={s.select_btn}>
                            Зберегти
                        </div>
                    </div>

                </div>

            </div>
            <div className={s.info}>
                <div className={s.form}>

                    <input type="email" id="email" name="email" className={s.input_email} placeholder="Місто"/>

                    <input type="email" id="email" name="email" className={s.input_email} placeholder="Вулиця"/>

                    <input type="text" id="name" name="name" className={s.input_name} placeholder="Номер телефону"/>

                    <input type="email" id="email" name="email" className={s.input_email} placeholder="Номер квартири"/>

                    <div className={s.select_btn}>
                        Зберегти зміни
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile;
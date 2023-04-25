import {useSelector} from "react-redux";

import LoginPage from "../Auth/login-page/login-page";
import Prof from "../Auth/login-page/Prof";

const Profile = () => {
    const isAuth = useSelector(state => state.auth.isAuth);

    return (
        <div>
            {isAuth ? <Prof/> : <LoginPage/>}
        </div>
    )
}

export default Profile;
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import GroupNavbar from "../../GroupNavbar";
import s from './GroupUser.module.scss'
import {doc, getDoc} from "firebase/firestore";
import {db} from "../../../../../../firebase-config";
import {setAnotherData, setGroup} from "../../../../../../store/slice/auth-slice";
import {v4 as uuidv4} from "uuid";
import TableHead from "./UsersTable/TableHead/TableHead";
import TableBody from "./UsersTable/TableBody/TableBody";
import {setNewsFromGroup, setRole, setUsersFromGroup} from "../../../../../../store/slice/group-slice";
import {useParams} from "react-router-dom";

const GroupUser = () => {
    const dispatch = useDispatch();

    const [users, setUsers] = useState([]);
    const [columns, setColumns] = useState([]);

    const {id} = useParams();
    const {id: userId, isAuth} = useSelector(state => state.auth);
    const getColumn = useSelector(state => state.group.columns);
    const usersFromGroup = useSelector(state => state.group.users)
    const getData = () => {
        const userDocRef = doc(db, 'groups', id);
        getDoc(userDocRef)
            .then((doc) => {
                const users = doc.data().users;
                for (let user of users) {
                    if (user.id === userId) {
                        dispatch(setRole({role: user.role}));
                    }
                }
                dispatch(setUsersFromGroup( {users:users}))
                return users;
            }).then((users) => {
            for (let user of users) {
                const userDocRef = doc(db, 'users', user.id);
                getDoc(userDocRef)
                    .then((doc) => {
                        // console.log(doc.data())
                        const fullInf = {...doc.data(), role: user.role}
                        setUsers(prevUsers => [...prevUsers, fullInf])
                    })
            }
        })
            .catch((error) => {
                console.log("Помилка отримання данних групи:", error);
            });
    }

    useEffect(() => {
        isAuth && getData()
    }, [isAuth])

    useEffect(() => {
        setColumns(getColumn);
    }, [])
    console.log(usersFromGroup)
    // console.log(columns)
    return (
        <div className={s.groupUsersPage}>
            <GroupNavbar/>
            <div className={s.listUsers}>
                <TableHead columns={columns}/>
                <TableBody columns={columns} users={users}/>
            </div>
        </div>
    )
}

export default GroupUser;
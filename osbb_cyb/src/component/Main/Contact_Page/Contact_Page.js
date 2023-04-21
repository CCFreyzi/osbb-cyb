import React, {useEffect, useState} from "react";
import {db} from "../../../firebase-config";
import {getDocs, collection} from "firebase/firestore"

const Contact_Page = () => {
    const [users, setUsers] = useState([]);

    const usersCollectionRef = collection(db, "users")

    useEffect(() => {

        const getUsers = async () => {
            //READ THE DB
            try {
                const data = await getDocs(usersCollectionRef)
                const filteredData = data.docs.map(doc => ({...doc.data(), id: doc.id}))
                setUsers(filteredData)
                console.log(filteredData)
            } catch (err) {
                console.error(err)
            }
        }

        getUsers()
    }, [])

    return (
        <div>
            <h2>Contact_Page</h2>
            <div>
                {users.map(user => (
                    <div key={user.id}>
                        <div>
                            NAME: {user.name}
                        </div>
                        <div>
                            SURNAME: {user.surname}
                        </div>
                        <div>
                            AGE: {user.age}
                        </div>
                    </div>
                ))}
            </div>

        </div>
    )
}

export default Contact_Page;
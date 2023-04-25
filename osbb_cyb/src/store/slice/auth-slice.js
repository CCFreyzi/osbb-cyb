import {createSlice} from "@reduxjs/toolkit";


const initialState = {
    email: null,
    id: null,
    isAuth: false,
    name: '',
    surname: '',
    age: 0,
    city: '',
    street: '',
    phonenumber: '',
    apartmentnumber: '',
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setEmailAndUid(state, action) {
            state.email = action.payload.email
            state.id = action.payload.id
        },
        setAnotherData(state, action) {
            state.name = action.payload.name
            state.surname = action.payload.surname
            state.age = action.payload.age

            state.city = action.payload.city
            state.street = action.payload.street
            state.phonenumber = action.payload.phonenumber
            state.apartmentnumber = action.payload.apartmentnumber
        },
        setAuth(state, action) {
            state.isAuth = action.payload
        }
    }
})

export const {setEmailAndUid, setAnotherData, setAuth} = authSlice.actions;
export default authSlice.reducer;
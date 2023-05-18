import {createSlice} from "@reduxjs/toolkit";


const initialState = {
    name: '',
    key: '',
    role:'',
    users: [],
    news: [],
    columns: [
        {
            id: '0',
            name: 'Role',
            value: 'role',
            type: 'STRING',
            isShow: true,
            isSortable: true
        },
        {
            id: '1',
            name: 'Name',
            value: 'name',
            type: 'STRING',
            isShow: true,
            isSortable: true
        },
        {
            id: '2',
            name: 'SurName',
            value: 'surName',
            type: 'STRING',
            isShow: true,
            isSortable: true
        },
        {
            id: '3',
            name: 'Phone',
            value: 'phonenumber',
            type: 'STRING',
            isShow: false,
            isSortable: true
        },
        {
            id: '4',
            name: 'Apartment number',
            value: 'apartmentnumber',
            type: 'NUMBER',
            isShow: false,
            isSortable: true
        },
        {
            id: '5',
            name: 'Delete member',
            value: '',
            type: 'STRING',
            isShow: false,
            isSortable: true
        },
    ],
}

const groupSlice = createSlice({
    name: 'group',
    initialState,
    reducers: {
        setGroupData(state, action) {
            state.name = action.payload.name
            state.key = action.payload.key
            state.users = action.payload.users
            state.news = action.payload.news
        },
        setRole(state, action) {
            state.role = action.payload.role
        },
        setNewsFromGroup(state, action) {
            state.news = action.payload.news
        },
        setUsersFromGroup(state, action) {
            state.users = action.payload.users

        }
    }
})

export const {setGroupData, setRole, setNewsFromGroup, setUsersFromGroup} = groupSlice.actions;
export default groupSlice.reducer;
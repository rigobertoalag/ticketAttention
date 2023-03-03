import React, { useReducer } from 'react'
import UserReducer from './UserReducer'
import UserContext from './UserContext'

const UserState = (props) => {
    const initialState = {
        userID: null,
        userName: null,
        joined: false
    }

    const [state, dispatch] = useReducer(UserReducer, initialState)

    const getUserId = (id) => {
        dispatch({
            type: 'GET_USER_ID',
            payload: id
        })
    }

    const getUserName = (name) => {
        dispatch({
            type: 'GET_USER_NAME',
            payload: name
        })
    }

    const getJoined = (val) => {
        dispatch({
            type: 'GET_JOINED',
            payload: val
        })

    }

    return (
        <UserContext.Provider value={{
            id: state.userID,
            user: state.userName,
            joined: state.joined,
            getUserId,
            getUserName,
            getJoined
        }}>
            {props.children}
        </UserContext.Provider>
    )
}

export default UserState
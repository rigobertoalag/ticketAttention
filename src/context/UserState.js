import React, { useReducer } from 'react'
import UserReducer from './UserReducer'
import UserContext from './UserContext'

const UserState = (props) => {
    const initialState = {
        user: null,
        joined: false
    }

    const [state, dispatch] = useReducer(UserReducer, initialState)

    const getUser = (id) => {
        dispatch({
            type: 'GET_USER',
            payload: id
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
            user: state.user,
            joined: state.joined,
            getUser,
            getJoined
        }}>
            {props.children}
        </UserContext.Provider>
    )
}

export default UserState
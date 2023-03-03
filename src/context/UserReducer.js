export default (state, action) => {
    const { payload, type } = action

    if (type === 'GET_USER_ID') {
        return {
            ...state,
            userID: payload
        }
    }
    else if (type === 'GET_USER_NAME') {
        return {
            ...state,
            userName: payload
        }
    } else if (type === 'GET_JOINED') {
        return {
            ...state,
            joined: payload
        }
    }
}
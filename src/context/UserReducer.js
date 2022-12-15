export default (state, action) => {
    const { payload, type } = action

    if (type === 'GET_USER') {
        return {
            ...state,
            user: payload
        }
    } else if (type === 'GET_JOINED') {
        return {
            ...state,
            joined: payload
        }
    }
}
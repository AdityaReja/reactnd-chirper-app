export const SET_AUTH_USER ='SET_AUTH_USER'

export  function setAuthUsers(id) {
    return {
        type: SET_AUTH_USER,
        id
    }
}
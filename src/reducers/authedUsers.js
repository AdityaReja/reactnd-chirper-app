import {SET_AUTH_USER} from '../actions/authedUsers'

export default function authUsers (state = null, action) {
    switch (action.type) {
        case SET_AUTH_USER :
            return action.id
        default :
            return state
    }
}
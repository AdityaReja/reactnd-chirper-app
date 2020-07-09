import {getInitialData} from '../utils/api'
import {recieveUsers} from './users'
import {recieveTweets} from './tweets'
import {setAuthUsers} from './authedUsers'
import {showLoading, hideLoading} from 'react-redux-loading'

const AUTH_USER = 'dan_abramov'

export function handleInitialData() {
    return (dispatch) => {
        dispatch(showLoading())
        return getInitialData().then(({users,tweets}) => {
            dispatch(recieveUsers(users))
            dispatch(recieveTweets(tweets))
            dispatch(setAuthUsers(AUTH_USER))
            dispatch(hideLoading())
        })
    }
}
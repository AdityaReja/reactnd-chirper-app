import {combineReducers} from 'redux'
import users from './users'
import tweets from './tweets'
import authUsers from './authedUsers'
import {loadingBarReducer} from 'react-redux-loading'

export default combineReducers ({
    users,
    tweets,
    authUsers, 
    loadingBar : loadingBarReducer
})
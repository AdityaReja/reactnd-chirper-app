import {saveLikeToggle, saveTweet} from '../utils/api'
import {showLoading, hideLoading} from 'react-redux-loading'

export const RECIEVE_TWEETS ='RECIEVE_TWEETS'

export const TOGGLE_TWEET = 'TOGGLE_TWEET'

export const ADD_TWEET = 'ADD_TWEET'

export function recieveTweets (tweets) {
    return {
        type : RECIEVE_TWEETS,
        tweets
    }
}

export function toggleTweet({id, authUsers, hasLiked}) {
    return {
        type: TOGGLE_TWEET, 
        id, 
        authUsers, 
        hasLiked
    }
}

export function handleToggleTweet(info) {
    return (dispatch)  => {
        dispatch(toggleTweet(info))

        return saveLikeToggle(info)
        .catch((e) => {
            console.log('There was an error while liking', e)
            toggleTweet(info)
            alert('There was an error in liking the tweet !! Try again')
        })
    }
}

export function addTweet(tweet) {
    return {
        type : ADD_TWEET, 
        tweet
    }
}

export function handleAddTweet(tweet, replyingTo) {
    return(dispatch, getState) => {
        const {authUsers} = getState()
        const text = tweet
        dispatch (showLoading())

        return saveTweet({
            text,
            author : authUsers,
            replyingTo
        }).then((tweet) => {
            dispatch(addTweet(tweet))
        }).then(() => {
            dispatch(hideLoading())
        })
    }
}
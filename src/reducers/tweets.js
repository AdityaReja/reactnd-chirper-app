import {RECIEVE_TWEETS, TOGGLE_TWEET} from '../actions/tweets'

export default function tweets (state = {} , action) {
    switch(action.type) {
        case RECIEVE_TWEETS :
            return {
                ...state, 
                ...action.tweets
            }
        case TOGGLE_TWEET :
            return {
                ... state,
                [action.id] : {
                    ...state[action.id], 
                    likes : action.hasLiked === 'true' 
                    ? state[action.id].likes.filter((uid) => uid != action.authUsers)
                    : state[action.id].likes.concat(action.authUsers)
                }
            }
        default :
            return state
    }
}
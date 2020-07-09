import React, { Component } from 'react'
import { connect } from 'react-redux'
import { formatTweet } from '../utils/helpers'
import { formatDate } from '../utils/helpers'
import { TiArrowBackOutline } from 'react-icons/ti'
import { TiHeartOutline } from 'react-icons/ti'
import { TiHeartFullOutline } from 'react-icons/ti'
import {handleToggleTweet} from '../actions/tweets'

class Tweet extends Component {

    toParent(e, parent) {
        e.preventDEfault();
    }

    handleLike() {
        const {tweet,authUsers,dispatch}= this.props
        dispatch(handleToggleTweet({
            id : tweet.id,
            hasLiked: tweet.hasLiked,
            authUsers
        }))
    }
    render() {
        const { tweet } = this.props
        if (tweet === null) {
            return <p>This Tweet Doesnt Exist</p>
        }

        const {
            name, avatar, text, hasLiked, likes, replies, timestamp, id, parent
        } = tweet

        return (
            <div className='tweet'>
                <img
                    src={avatar}
                    alt={`Avatar of ${name}`}
                    className='avatar'
                />
                <div className='tweet-info'>
                    <span>{name}</span>
                    <div>{formatDate(timestamp)}</div>
                    {parent &&
                        <button className='replying-to' onClick={(e) => this.toParent(e, parent)}>
                            Replying to @ {parent.author}
                        </button>
                    }
                    <p>{text}</p>
                    <div className='tweet-icon'>
                        <TiArrowBackOutline className='tweet-icon' />
                        <span>{replies !== 0 && replies}</span>
                        <button className = 'heart-button' onClick = {() => this.handleLike()}>
                            {hasLiked ?
                                <TiHeartFullOutline className='tweet-icon' color ='#e0245e'/>
                                : <TiHeartOutline className='tweet-icon' />
                            }
                        </button>
                        <span>{likes !== 0 && likes}</span>
                    </div>
                </div>
            </div>
        )
    }
}

function mapStateToProp({ authUsers, users, tweets }, { id }) {
    const tweet = tweets[id]
    const parentTweet = tweet ? tweets[tweet.replyingTo] : null

    return {
        authUsers,
        tweet: tweet ? formatTweet(tweet, users[tweet.author], authUsers, parentTweet) : null
    }
}

export default connect(mapStateToProp)(Tweet)

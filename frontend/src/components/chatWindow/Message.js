import React, { useContext } from 'react'
import AuthContext from '../../context/AuthContext'

function Message(props) {

    const {user} = useContext(AuthContext)
    const rowClass = () => {
        const row = 'message '
        //TODO: fix messages not assigning right color
        if (toString(props.sender).trim() == toString(user.user_id).trim()) { return row + 'self-message' }
        return row + 'others-message'
    }

    return (
        <>
            <div className={rowClass()}>
                <p className='mb-0'>{props.message}</p>
                <p className='time m-0'>{props.date}</p>
            </div>
        </>
    )
}

export default Message

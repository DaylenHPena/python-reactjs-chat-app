import React, { useContext } from 'react'
import AuthContext from '../../context/AuthContext'

function Message(props) {

    const {user} = useContext(AuthContext)
    const rowClass = () => {
        const row = 'text-wrap message '
        //TODO: fix messages not assigning right color
        if (String(props.sender) === String(user.user_id)) { return row + 'self-message' }
        return row + 'others-message'
    }
    console.log('props', props)

    return (
        <>
            <div className={rowClass()}>
                <p className='mb-0 '>{props.text}</p>
                <p className='time m-0'>{props.created_at}</p>
            </div>
        </>
    )
}

export default Message

import React, { useContext } from 'react'
import AuthContext from '../../context/AuthContext'

function Message(props) {
    const { user } = useContext(AuthContext)

    const rowClass = () => {
        const row = 'text-wrap message '
        if (String(props.sender) === String(user.user_id)) { return row + 'self-message' }
        return row + 'others-message'
    }

    const time = (stringDate) => (new Date(stringDate).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }))

    return (
        <>
            <div className={rowClass()}>
                <p className='mb-0 '>{props.text} <span className='time mb-0'>{time(props.created_at)}</span></p>

            </div>
        </>
    )
}

export default Message

import React, { useContext } from 'react'
import AuthContext from '../../context/AuthContext'

function Message({ message }) {
    const { user } = useContext(AuthContext)
    const { sender, text, created_at } = message || {}

    const rowClass = () => {
        const row = 'text-wrap message '
        if (String(sender) === String(user.user_id)) { return row + 'self-message' }
        return row + 'others-message'
    }

    const time = (stringDate) => (new Date(stringDate).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }))

    return (
        <>
            <div className={rowClass()}>
                <p className='mb-0 '>{text} <span className='time mb-0'>{time(created_at)}</span></p>
            </div>
        </>
    )
}

export default Message

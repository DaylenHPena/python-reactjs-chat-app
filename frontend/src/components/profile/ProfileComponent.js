import React from 'react'

export default function ProfileComponent({ user }) {
    const { username, avatar, about } = user
    return (
        <div>
            <div className="m-2 mb-4"><img src="https://t4.ftcdn.net/jpg/03/64/21/11/360_F_364211147_1qgLVxv1Tcq0Ohz3FawUfrtONzz8nq3e.jpg" className=' rounded-circle avatar-md' /></div>
            <h5>{username}</h5>
            <p>About</p>
            <p>Love long walks on the beach and sunsets</p>
        </div>
    )
}

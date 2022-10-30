export default function ContactThumbnail({ user, onClick }) {
    const { pk, username, avatar } = user

    const handleClick = () => {
        onClick(pk)
    }

    return (
        <a onClick={handleClick}>
            <div className="d-flex px-2 py-3 mb-0 chat-room" >
                <div className="me-3"><img src={avatar} className=' rounded-circle avatar-xs' /></div>
                <div className='flex-grow-1'>
                    <div className='m-0 text-start mw-75'>
                        <p className='fw-semibold m-0 text-truncate'>{username}</p>
                    </div>
                </div>
            </div>
        </a>
    )
}

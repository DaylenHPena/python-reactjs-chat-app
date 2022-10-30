export function AddContactThumbnail({ user, onClick }) {
    const { pk, username, avatar, is_contact } = user || {};

    let handleOnClick = () => {
        onClick(pk);
    };

    const AddBtn = () => (!is_contact ? (<a className="btn btn-primary" onClick={handleOnClick}>Add</a>
    ) : null);

    return (
        <div className="d-flex px-2 py-3 mb-0 chat-room">
            <div className="me-3"><img src={avatar} className=' rounded-circle avatar-xs' /></div>
            <div className='flex-grow-1'>
                <div className='m-0 text-start mw-75'>
                    <p className='fw-semibold m-0 text-truncate'>{username}</p>
                </div>
            </div>
            <AddBtn />
        </div>
    );

}

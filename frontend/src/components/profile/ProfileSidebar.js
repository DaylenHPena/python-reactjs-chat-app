import React, { useContext } from 'react'
import AuthContext from '../../context/AuthContext'
import ToogleOffCanvas from '../../utils/ToogleOffCanvas'
import ProfileComponent from './ProfileComponent'

export default function ProfileSidebar() {
    let { user } = useContext(AuthContext)

    return (
        <div id="profile" className="offcanvas offcanvas-start p-0 border-end border-opacity-50 pe-0 bg-sidebar">
            <div className="d-flex px-4 align-items-center top-nav bg-dark-nav">
                <span className='fa fa-arrow-left me-2' data-toogle="profile" onClick={ToogleOffCanvas}></span>Profile
            </div>
            <ProfileComponent user={user} />
        </div>)
}

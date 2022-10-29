import React, { useContext } from 'react'
import ToogleOffCanvas from '../../utils/ToogleOffCanvas'
import ProfileComponent from './ProfileComponent'

export default function ProfileSidebar() {

    return (
        <div id="profile" className="offcanvas offcanvas-start p-0 pe-0 bg-sidebar">
            <div className="d-flex px-4 align-items-center top-nav bg-dark-nav">
                <span className='fa fa-arrow-left me-2' data-toogle="profile" onClick={ToogleOffCanvas}></span><p>Profile</p>
            </div>
            <ProfileComponent/>
        </div>)
}

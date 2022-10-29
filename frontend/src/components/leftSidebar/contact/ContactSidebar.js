import React, { useState } from 'react'
import ToogleOffCanvas from '../../../utils/ToogleOffCanvas'
import ContactThumbnail from './ContactThumbnail'

export default function ContactSidebar({ contacts }) {

    //TODO: get contacts only when this window is visible
    return (
        <div id="contacts" className="offcanvas offcanvas-start p-0 border-end border-opacity-50 pe-0 bg-sidebar">
            <div className="d-flex px-4 align-items-center top-nav bg-dark-nav">
                <span className='fa fa-arrow-left me-2' onClick={ToogleOffCanvas} data-toogle="contacts"></span>
                <p>Contacts</p>
            </div>
            <div className='px-2 mt-2'>
                <form>
                    <div className="input-group mb-3">
                        <span className="input-group-text" id="basic-addon1"><span className='fa fa-search'></span></span>
                        <input id='search' name='search' type="text" className="form-control" placeholder="Search" aria-label="Username" aria-describedby="basic-addon1" required />
                    </div>
                </form>
            </div>
            <button id='btn-toggle-add-contact' className='btn btn-primary btn-circle btn-sm ' onClick={ToogleOffCanvas} data-toogle="add-contacts"><span className='fa fa-plus'></span></button>
            <ul className='list-unstyled mt-2'>
                {contacts.map(contact => (
                    <>
                        <li key={contact.pk} id={contact.pk} >
                            {<ContactThumbnail user={contact} />}
                        </li>
                    </>
                ))}
            </ul>

        </div>)
}

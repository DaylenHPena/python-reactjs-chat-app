import React, { useState } from 'react'
import { addContact, searchUsers } from '../../service/ServiceApi'
import ToogleOffCanvas from '../../utils/ToogleOffCanvas'
import { AddContactThumbnail } from './AddContactThumbnail'

export default function AddContactSidebar({ onNewContact }) {
    const [searchResult, setSearchResult] = useState(null)

    const handleSubmit = (e) => {
        e.preventDefault();
        const search = e.target.search.value
        searchUsers(search)
            .then(data => { setSearchResult(data) })
            .catch(error => {
                console.log(error)
            })
    }

    const handleOnClick = (pk) => {
        addContact(pk)
            .then(() => {
                onNewContact(pk)
                document.getElementById('close-contact-sidebar').click();
            })
            .catch(error => {
                console.log(error)
            })
    }

    //TODO: get contacts only when this window is visible
    return (
        <div id="add-contacts" className="offcanvas offcanvas-start p-0  border-opacity-50 pe-0">
            <div className="d-flex px-4 align-items-center top-nav bg-dark-nav">
                <span className='fa fa-arrow-left me-2' id='close-contact-sidebar' onClick={ToogleOffCanvas} data-toogle="add-contacts"></span><p>New Contact</p>
            </div>
            <div className='px-2 mt-2'>
                <form onSubmit={handleSubmit}>
                    <div className="input-group mb-3">
                        <span className="input-group-text" id="basic-addon1"><span className='fa fa-search'></span></span>
                        <input id='search' name='search' type="text" className="form-control" placeholder="Search" aria-label="Username" aria-describedby="basic-addon1" required />
                    </div>
                </form>
            </div>
            <ul className='list-unstyled mt-2'>
                {searchResult
                    ? searchResult.length > 0
                        ? searchResult.map(user => (
                            <>
                                <li key={user.pk} id={user.pk} >
                                    <AddContactThumbnail user={user} onClick={handleOnClick} />
                                </li>
                            </>))
                        : <h3>No results</h3>
                    : null
                }
            </ul>

        </div>)
}



import React, { useState } from 'react'
import { API_ADD_CONTACT, API_SEARCH_CONTACT, HTTP_HEADERS } from '../../../constants'
import ToogleOffCanvas from '../../../utils/ToogleOffCanvas'

export default function AddContactSidebar() {
    const [searchResult, setSearchResult] = useState([])

    const searchContact = async (value) => {
        let response = await fetch(API_SEARCH_CONTACT + value, {
            ...HTTP_HEADERS(),
            method: "GET",
        })

        let data = await response.json()

        if (response.status === 200) {
            console.log('data', data)
            return data;
        }
        else {
            return { error: response.statusText }
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        //TODO:check errors
        async function fetchData() {
            const list = await searchContact(e.target.search.value)
            setSearchResult(list)
        }
        fetchData()
    }

    //TODO: get contacts only when this window is visible
    return (
        <div id="add-contacts" className="offcanvas offcanvas-start p-0  border-opacity-50 pe-0 bg-sidebar">
            <div className="d-flex px-4 align-items-center top-nav bg-dark-nav">
                <span className='fa fa-arrow-left me-2' onClick={ToogleOffCanvas} data-toogle="add-contacts"></span><p>New Contact</p>
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
                {searchResult.map(user => (
                    <>
                        <li key={user.pk} id={user.pk} >
                            <AddContactThumbnail user={user} />
                        </li></>
                ))}
            </ul>

        </div>)
}

function AddContactThumbnail({ user }) {
    const { pk, username, avatar, is_contact } = user || {}

    console.log('AddContactThumbnail', user)

    let addContact = async (e) => {
        let response = await fetch(API_ADD_CONTACT + pk + '/', {
            ...HTTP_HEADERS(),
            method: "GET",
        })

        let data = await response.json()

        if (response.status === 200) {
            console.log('data', data)
            return data;
        }
        else {
            return { error: response.statusText }
        }
    }

    const addBtn = () => (!is_contact ? (<a className="btn btn-primary"  onClick={addContact} >Add</a>
    ) : null)

    return (
        <div className="d-flex px-2 py-3 mb-0 chat-room">
            <div className="me-3"><img src={avatar} className=' rounded-circle avatar-xs' /></div>
            <div className='flex-grow-1'>
                <div key={pk} className='m-0 text-start mw-75'>
                    <p className='fw-semibold m-0 text-truncate'>{username}</p>
                </div>
            </div>
            {addBtn()}
        </div>
    )

}

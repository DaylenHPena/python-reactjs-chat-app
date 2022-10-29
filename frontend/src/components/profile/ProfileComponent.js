import { useFormik } from 'formik'
import React, { useContext, useState } from 'react'
import { Modal } from '../Modal'
import { API_CHANGE_AVATAR, AUTH_HEADER } from '../../constants/index.js'
import AuthContext from '../../context/AuthContext'

export default function ProfileComponent() {
    const { user  } = useContext(AuthContext)
    const { user_id, username, avatar } = user
    const [shouldShowModal, setShouldShowModal] = useState(false)

    return (
        <>
            <div>
                <div className="m-2 mb-4"><img src={avatar} className=' rounded-circle avatar-md' /></div>
                <button type="button" className='fa fa-pencil btn btn-primary btn-circle btn-xs' onClick={() => setShouldShowModal(!shouldShowModal)}/>
                <Modal shouldShow={shouldShowModal} onRequestClose={() => { setShouldShowModal(false) }}>
                    <ImageUploadForm pk={user_id} />
                </Modal>
                <h5>{username}</h5>
                <p>About</p>
                <p>Love long walks on the beach and sunsets</p>
            </div>
        </>
    )
}

const ImageUploadForm = ({ pk }) => {
    const { reload } = useContext(AuthContext)
    const [selectedImage, setSelectedImage] = useState('');
    const formik = useFormik({
        initialValues: {
            avatar: null,
        },
        onSubmit: async (values) => {
            console.log('values', values)
            let formData = new FormData()
            formData.append('avatar', values.avatar, values.avatar.name)

            console.log('formData', formData)

            const url = API_CHANGE_AVATAR 

            let response = await fetch(url, {
                headers: {
                    //'Content-type': 'multipart/form-data', using this make problem
                    'Authorization': localStorage.getItem('authTokens') ? 'Bearer ' + JSON.parse(localStorage.getItem('authTokens')).access : null,
                },
                method: "PUT",
                body: formData,

            })

            if (response.status === 200) {
                console.log('updated')
                reload()
            }
            else {
                console.log('error')

                return { error: response.statusText }
            }
        }})

    return (
        <form onSubmit={formik.handleSubmit}>
            <h1>Change Avatar</h1>
            {selectedImage && (
                <div>
                    <img alt="not fount" width={"250px"} src={URL.createObjectURL(selectedImage)} />
                    <br />
                    <button onClick={() => setSelectedImage(null)}>Remove</button>
                </div>
            )}
            <br />

            <br />
            <input
                id="avatar"
                type="file"
                name="avatar"
                accept="image/jpeg,image/png,image/gif"
                onChange={e => { formik.setFieldValue('avatar', e.currentTarget.files[0]) }}

            />
            <button type='submit' className='btn btn-primary'>Upload</button>
        </form>
    );
}
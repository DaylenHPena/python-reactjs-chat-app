import { useFormik } from 'formik'
import React, { useState } from 'react'
import { Modal } from '../Modal'
import { API_CHANGE_AVATAR, AUTH_HEADER } from '../../constants/index.js'

export default function ProfileComponent({ user }) {
    const { pk, username, avatar, about } = user
    const [shouldShowModal, setShouldShowModal] = useState(false)

    return (
        <>
            <div>
                <div className="m-2 mb-4"><img src={avatar} className=' rounded-circle avatar-md' /></div>
                <span className='fa fa-pencil btn btn-primary btn-circle btn-xs'></span>
                <button type="button" className="btn btn-primary" onClick={() => setShouldShowModal(!shouldShowModal)}>
                    Launch static backdrop modal
                </button>
                <Modal shouldShow={shouldShowModal} onRequestClose={() => { setShouldShowModal(false) }}>
                    <ImageUploadForm />
                </Modal>
                <h5>{username}</h5>
                <p>About</p>
                <p>Love long walks on the beach and sunsets</p>
            </div>
        </>
    )
}

const ImageUploadForm = (pk) => {
    const [selectedImage, setSelectedImage] = useState(null);
    const formik = useFormik({
        initialValues: {
            image: null,
        },
        onSubmit: async (values) => {
            console.log('values', values)
            var formData = new FormData()
            //formData.append('avatar', image)
            const response = await fetch(API_CHANGE_AVATAR + pk + '/',
                {
                    headers:
                    {
                        ...AUTH_HEADER(),
                        'Content-Type': 'multipart/form-data'
                    },
                    method: "POST",
                    body: JSON.stringify(formData)
                })
            let data = await response.json()

            if (data.status === 201) {
                return data.data
            }
        }
    })

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
                type="file"
                name="image"
                accept="image/jpeg,image/png,image/gif"
                value={formik.values.image}
                onChange={formik.handleChange}
                
            />
            <button type='submit' className='btn btn-primary'>Upload</button>
        </form>
    );
}
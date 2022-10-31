import { useFormik } from 'formik'
import React, { useContext, useState } from 'react'
import { Modal } from '../Modal'
import AuthContext from '../../context/AuthContext'
import { updateAvatarImage } from '../../service/ServiceApi'
import './profile.css'

export default function ProfileComponent() {
    const { user, logoutUser } = useContext(AuthContext)
    const { user_id, username, avatar } = user || {}
    const [shouldShowModal, setShouldShowModal] = useState(false)

    return (user
        ?
        <div>
            <div className="m-2 mb-4"><img src={avatar} className=' rounded-circle avatar-md' /></div>
            <button type="button" className='fa fa-pencil btn btn-primary btn-circle btn-xs' onClick={() => setShouldShowModal(!shouldShowModal)} />
            <Modal shouldShow={shouldShowModal} onRequestClose={() => { setShouldShowModal(false) }}>
                <ImageUploadForm pk={user_id} />
            </Modal>
            <h5>{username}</h5>
            <p>About</p>
            <p>Love long walks on the beach and sunsets</p>
            <div className='credits'><small>Images by Freepik and pikisuperstar on Freepik</small></div>
            <div className="logout w-100 py-2" href="#">Log out<span className="fa fa-sign-out ms-3" onClick={logoutUser}></span></div>
        </div>
        : null
    )
}

const ImageUploadForm = ({ pk }) => {
    const [selectedImage, setSelectedImage] = useState('');

    const formik = useFormik({
        initialValues: {
            avatar: null,
        },
        onSubmit: async (values) => {
            let formData = new FormData()
            formData.append('avatar', values.avatar, values.avatar.name)

            updateAvatarImage(formData)
            //TODO: get user from databasenp
        }
    })

    return (
        <form onSubmit={formik.handleSubmit}>
            <h1>Change Avatar</h1>
            {selectedImage && (
                <div>
                    <img alt="not fount" width={"250px"} src={URL.createObjectURL(selectedImage)} />
                    <br />
                    <button
                        onClick={() => {
                            setSelectedImage(null)
                            //formik.setFieldValue('avatar', null)
                        }}
                    >Remove</button>
                </div>
            )}
            <br />

            <br />
            <input
                id="avatar"
                type="file"
                name="avatar"
                accept="image/jpeg,image/png,image/gif"
                onChange={e => {
                    formik.setFieldValue('avatar', e.currentTarget.files[0])
                    //setSelectedImage(e.currentTarget.files[0])
                }}
                required

            />
            <button type='submit' className='btn btn-primary'>Upload</button>
        </form>
    );
}
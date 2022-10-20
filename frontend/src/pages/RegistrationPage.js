import { useFormik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import { API_REGISTRATION, HTTP_HEADERS } from "../constants";

function RegistrationPage() {

    let navigate = useNavigate()

    const formik = useFormik({
        initialValues: {
            username: "",
            password: "",
            confirm_password: "",
        },

        onSubmit: async (values) => {
            console.log('submitting', values)
            let response = await fetch(API_REGISTRATION, {
                headers: {
                    'Content-Type': 'application/json',
                },
                method: "POST",
                body: JSON.stringify({ 'username': values.username, 'password': values.password })
            })

            let data = await response.json()

            if (response.status === 201) {
                console.log(response.data)
                navigate('/login')
            }
            else {
                console.log('errors', response.data)
            }
        },
        //TODO: validate fields
        //TODO: add error fields to html
        validate: (values) => {
            const errors = {};
            console.log(values)

            if (!values.username) {
                errors.name = 'Required';
            } if (!values.password) {
                errors.password = 'Required';
            } if (!values.confirm_password) {
                errors.confirm_password = 'Required';
            } if (values.password != "" && values.confirm_password != "" && values.confirm_password != values.password) {
                errors.confirm_password = "Must be equal to your password"
            }
            //else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.password)) { errors.email = 'Invalid email address'; }

            console.log(errors)
            return errors;

        }
    })

    return (
        <div className="container bg-light vh-100 vw-100">
            <div className="justify-content-center row">
                <div className="col-md-8 col-lg-6 col-xl-5">
                    <div className="text-center mb-4">
                        <h4>Sign up</h4>
                    </div>

                    <div className="card">
                        <div className="p-5 card-body">
                            <form onSubmit={formik.handleSubmit} className="p-5 text-start">

                                <div className="form-group">
                                    <label className="form-label">Username</label>
                                    <div className="input-group mb-3">
                                        <span className="input-group-text" id="basic-addon1"><span className="fa fa-user-circle-o"></span></span>
                                        <input id="username"
                                            name="username"
                                            type="text"
                                            className="form-control"
                                            placeholder="Enter username"
                                            value={formik.values.username}
                                            onChange={formik.handleChange}
                                            aria-label="Username"
                                            aria-describedby="basic-addon1"
                                            required
                                        >
                                        </input>
                                        {formik.errors.name ? (
                                            <div class="invalid-feedback">
                                                <p>{formik.errors.name}</p>
                                            </div>
                                        ) : null}
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label className="form-label">Password</label>
                                    <div className="input-group mb-3">
                                        <span className="input-group-text" id="basic-addon1"><span className="fa fa-lock"></span></span>
                                        <input id="password"
                                            name="password"
                                            type='password'
                                            placeholder="Enter your password"
                                            className="form-control"
                                            value={formik.values.password}
                                            onChange={formik.handleChange}
                                            aria-label="Username"
                                            aria-describedby="basic-addon1"
                                            required>
                                        </input>
                                    </div>
                                </div>
                                <div className="form-group mb-5">
                                    <label className="form-label">Confirm Password</label>
                                    <div className="input-group mb-3">
                                        <span className="input-group-text" id="basic-addon1"><span className="fa fa-lock"></span></span>
                                        <input id="confirm_password"
                                            name="confirm_password"
                                            type='password'
                                            placeholder="Repeat your password"
                                            className="form-control"
                                            value={formik.values.confirm_password}
                                            onChange={formik.handleChange}
                                            aria-label="Username"
                                            aria-describedby="basic-addon1"
                                            required>
                                        </input>
                                    </div>
                                </div>
                                <button className="btn btn-primary w-100" type="submit">Sign up</button>
                            </form>
                        </div>
                    </div>
                    <div><Link to='/login'>Sign in</Link></div>

                </div>
            </div>
        </div>
    )
}


export default RegistrationPage
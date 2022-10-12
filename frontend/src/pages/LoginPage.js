import { useFormik } from "formik";
import React, { useContext } from 'react'
import { Link } from "react-router-dom";
import AuthContext from "../context/AuthContext";

function LoginPage() {

    let { loginUser } = useContext(AuthContext)

    const formik = useFormik({
        initialValues: {
            username: "",
            password: "",
        },
        onSubmit: async (values) => {
            loginUser(values)
        }
    })

    return (
        <div className="container bg-light">
            <div className="justify-content-center row">
                <div className="col-md-8 col-lg-6 col-xl-5">
                    <div className="text-center mb-4">
                        <h4>Sign in</h4>
                    </div>

                    <div className="card ">
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
                                            aria-describedby="basic-addon1">
                                        </input>
                                    </div>
                                </div>
                                <div className="form-group  mb-5">
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
                                            aria-describedby="basic-addon1">
                                        </input>
                                    </div>
                                </div>
                                <button className="btn btn-primary m-3 w-100" type="submit">Sign in</button>
                            </form>

                            <div><p>Don't have an account ?  <Link to="/registration">Sign up now</Link></p></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LoginPage
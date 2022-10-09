import { useFormik } from "formik";
import React, { useContext } from 'react'
import AuthContext from "../context/AuthContext";




function LoginPage() {

    let {loginUser} = useContext(AuthContext)

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
        <div className="row">
            <div className="col-4"></div>
            <div className="col-3">
                <h2 >Login</h2>
                <form onSubmit={formik.handleSubmit}>
                    <div>
                        <label className="form-label">User</label>
                        <input id="username"
                            name="username"
                            placeholder="Enter username"
                            type='text'
                            className="form-control"
                            value={formik.values.username}
                            onChange={formik.handleChange}
                        ></input>
                    </div>
                    <div>
                        <label className="form-label">Password</label>
                        <input id="password"
                            name="password"
                            type='password'
                            placeholder="Enter your password"
                            className="form-control"
                            value={formik.values.password}
                            onChange={formik.handleChange}
                        ></input>
                    </div>
                    <button className="btn btn-primary m-3" type="submit">Login</button>
                </form>
            </div>
            <div className="col"></div>
        </div>
    )
}

export default LoginPage
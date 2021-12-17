import { useState } from "react"
import React from 'react'
import { useNavigate } from 'react-router-dom'

const SignUp = (props) => {
    const [credentials, setCredentials] = useState({ name: "", email: "", password: "", cpassword: "" })
    let navigate = useNavigate();

    const handleSubmit = async (e) =>
    {
        const { name, email, password } = credentials
        e.preventDefault(); const response = await fetch("http://localhost:5000/api/auth/createuser",
            {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, email, password })
            });

        const json = await response.json()
        console.log(json);

        if (json.success)
        {
            localStorage.setItem('token', json.authtoken)
            props.showAlert("Account Created !", "success")
            navigate("/Home")
        }

        else
        {
            props.showAlert("Invalid Credentials", "danger")
        }
    }
    const onChange = (e) =>
    {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };


    return (
        <div className="row d-flex justify-content-center align-items-center">
            <div className="row justify-content-center">
                <div className="col-md-10 col-lg-6 col-xl-5">
                    <p className="text-center h1 fw-bold mb-4 mx-md-4 mt-2">Sign Up</p>
                    <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.png" className="img-fluid" alt="a" />

                    <form className=" mx-md-3" onSubmit={handleSubmit}>

                        <div className="d-flex flex-row align-items-center mb-3">
                            <i className="fas fa-user fa-lg  fa-fw"></i>
                            <div className="form-outline flex-fill mb-0">
                                <input type="text" id="name" name="name" className="form-control" onChange={onChange} />
                                <label className="form-label" >Your Name</label>
                            </div>
                        </div>

                        <div className="d-flex flex-row align-items-center mb-3">
                            <i className="fas fa-envelope fa-lg fa-fw"></i>
                            <div className="form-outline flex-fill mb-0">
                                <input type="email" id="email" name="email" className="form-control" onChange={onChange} />
                                <label className="form-label" >Your Email</label>
                            </div>
                        </div>

                        <div className="d-flex flex-row align-items-center mb-3">
                            <i className="fas fa-lock fa-lg fa-fw"></i>
                            <div className="form-outline flex-fill mb-0">
                                <input type="password" id="password" name="password" className="form-control" onChange={onChange} minLength={5} required />
                                <label className="form-label" >Password</label>
                            </div>
                        </div>

                        <div className="d-flex flex-row align-items-center mb-3">
                            <i className="fas fa-key fa-lg fa-fw"></i>
                            <div className="form-outline flex-fill mb-0">
                                <input type="password" id="cpassword" name="cpassword" className="form-control" onChange={onChange} minLength={5} required />
                                <label className="form-label" >Repeat your password</label>
                            </div>
                        </div>

                        <div className="form-check d-flex justify-content-center mb-3">
                            <input className="form-check-input me-2"type="checkbox"value=""id="checkbox"/>
                            <label className="form-check-label">
                                I agree all statements in <a href="#!">Terms of service</a>
                            </label>
                        </div>

                        <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                            <button type="button" className="btn btn-primary btn-lg">Register</button>
                        </div>

                    </form>
                </div>
            </div>
        </div>
    )
}

export default SignUp

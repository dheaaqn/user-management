import React, { useState } from "react";
import './style.css';

const Login = () => {
    const [formBody, setFormBody] = useState({
        username: undefined,
        password: undefined,
    })
    const [errorUsername, setErrorUsername] = useState(undefined)
    const [errorPassword, setErrorPassword] = useState(undefined)

    const onChangeUsername = (e) => {
        setErrorUsername(undefined)
        setFormBody({
            ...formBody,
            username: e.target.value
        })
    }

    const onChangePassword = (e) => {
        setErrorPassword(undefined)
        setFormBody({
            ...formBody,
            password: e.target.value
        })
    }

    const onButtonClick = () => {
        if(!formBody.username) {
            setErrorUsername("Username must be filled!")
        }

        if(!formBody.password) {
            setErrorPassword("Password must be filled!")
        }

        const bodyRequest = JSON.stringify({...formBody})
        if(formBody.username && formBody.password) {
            fetch('https://fakestoreapi.com/auth/login', {
                method:'POST',
                body: bodyRequest
            })
            .then((response) => response.json())
            .then((success) => console.log(success))
            .catch((error) => window.alert(error))
        }
    }

    return (
        <div className="container">
            <div className="title">Login Page</div>
            <br/>
            <br />
            <div className="input_container">
                <input
                    value={formBody.username}
                    placeholder="Key in Username"
                    onChange={(e) => onChangeUsername(e)}
                    className={'inputBox'}
                />
                <label className="errorLabel">{errorUsername}</label>
            </div>
            <br />
            <div className="input_container">
                <input
                    type="password"
                    value={formBody.password}
                    placeholder="Key in Password"
                    onChange={(e) => onChangePassword(e)}
                    className={'inputBox'}
                />
                <label className="errorLabel">{errorPassword}</label>
            </div>
            <br />
            <div className="button_container">
                <input className={'inputButton'} type="button" onClick={() => onButtonClick()} value={"Login"}/>
            </div>
        </div>
    )
}

export default Login
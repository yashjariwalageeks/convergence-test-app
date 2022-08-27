import React, {useState} from 'react'
import {useHistory} from "react-router-dom";
import {toast} from "react-toastify";

import Input from '../../components/Input'
import Button from "../../components/Button";
import {loginUser} from "../../actions/loginActions";
import './login.css'

const defaultState = {email: "", password: "", error: {}, isLoading: false}
const LoginPage = () => {
    const [state, setState] = useState({email: "", password: ""});
    const history = useHistory()

    const handleChange = ({target: {name, value}}) => {
        setState({...state, [name]: value})
    }

    const validateCredentials = () => {
        const {email, password} = state
        const emailCheckRegex = new RegExp(/^[\w.-]+@([\w]+\.)+[\w.]{2,3}$/gi);
        const error = {};
        if (!email?.trim()) {
            error.email = "Email is required field."
        } else if (!emailCheckRegex.test(email)) {
            error.email = "Please enter a valid email."
        }
        if (!password?.trim()) {
            error.password = "Password is required field.\n"
        }
        if (Object.keys(error).length > 0) {
            setState({...state, error})
            return false;
        }
        setState({...state, error: {}})
        return true;
    }

    const onSubmit = () => {
        if (validateCredentials()) {
            const {email, password} = state;
            const payload = {
                email, password
            }
            setState({...state, isLoading: true})
            loginUser(payload).then((response) => {
                if (response.statusCode === 200) {
                    toast.success(response.message);
                    setState(defaultState)
                    history.push("/home")
                } else {
                    toast.error(response.message);
                    setState(defaultState)
                }

            }).catch((e) => {
                toast.error(e.message);
                setState(defaultState);
            })
        }
    }
    return (
        <div className={"login-page-wrapper"}>
            <div className={"login-item-wrapper"}>
                <h1>Log in</h1>
                <Input
                    inputStyle={{"--in-color": "#9d49ee"}}
                    label={"Email"}
                    type="text"
                    name={"email"}
                    placeholder={"Enter your email"}
                    value={state.email}
                    error={state?.error?.email}
                    onChange={handleChange}
                />
                <Input
                    inputStyle={{"--in-color": "#9d49ee"}}
                    label={"Password"}
                    type="password"
                    name={"password"}
                    placeholder={"Enter your password"}
                    value={state.password}
                    error={state?.error?.password}
                    onChange={handleChange}
                />
                <Button buttonStyle={{fontSize: "1.3rem", "--btn-background": "#9d49ee"}} onClick={onSubmit}
                        disabled={state.isLoading}>
                    {state.isLoading ? <i className="fa fa-circle-o-notch fa-spin"/> : "Log in"}
                </Button>
            </div>
        </div>)
}

export default LoginPage;
import React, {useState} from 'react'
import {useHistory} from "react-router-dom";
import DatePicker from "react-datepicker";
import {toast} from 'react-toastify';
import Input from '../../components/Input'
import Button from "../../components/Button";
import '../LoginPage/login.css'
import './registration.css'
import {registerUser} from "../../actions/RegistrationActions";


const defaultState = {
    email: "",
    password: "",
    confirmPassword: "",
    dateOfBirth: "",
    gender: "",
    error: {},
    isLoading: false
}

const ExampleCustomInput = React.forwardRef(({value, onClick, placeholder}, ref) => {
    return <button className="input-wrapper" onClick={onClick} ref={ref}>
        <span>{value ? value : placeholder}</span>
    </button>
});

const RegistrationPage = () => {
    const [state, setState] = useState(defaultState);
    const history = useHistory()

    const handleChange = ({target: {name, value}}) => {
        setState({...state, [name]: value})
    }
    const handleChangeDate = (value) => {
        setState({...state, dateOfBirth: value})
    }

    //Validate registration form
    const validateCredentials = () => {
        const {email, password, confirmPassword, dateOfBirth, gender} = state;
        const error = {};
        const emailCheckRegex = new RegExp(/^[\w.-]+@([\w]+\.)+[\w.]{2,3}$/gi);
        const passwordCheckRegex = new RegExp(/^[A-Za-z0-9]{6,12}$/gi);
        if (!email?.trim()) {
            error.email = "Email is required field."
        } else if (!emailCheckRegex.test(email)) {
            error.email = "Please enter a valid email."
        }
        const trimmedPassword = password?.trim();
        const trimmedConfirmPassword = confirmPassword?.trim();
        if (!password?.trim()) {
            error.password = "Password is required field.\n"
        }
        if (!!trimmedPassword && (trimmedPassword.length < 6 || trimmedPassword.length > 12)) {
            error.password = "Password length should be between 6-12 characters.\n"
        }

        if (!trimmedPassword || trimmedPassword.split(/([A-Za-z])/g).length < 5) {
            error.password = (error.password ?? "") + "Password should contain minimum 2 alphabets.\n"
        }

        if (!passwordCheckRegex.test(trimmedPassword)) {
            error.password = (error.password ?? "") + "Password should not contain any special character."
        }

        if (!trimmedConfirmPassword) {
            error.confirmPassword = "Confirm password is required field."
        }

        if (!!trimmedConfirmPassword && trimmedConfirmPassword !== trimmedPassword) {
            error.confirmPassword = "Password do not match."
        }

        if (!dateOfBirth?.trim?.() && !dateOfBirth) {
            error.dateOfBirth = "Date of birth is required field."
        }

        if (!gender?.trim()) {
            error.gender = "Gender is required field."
        }
        if (Object.keys(error).length) {
            setState({...state, error: error})
            return false;
        }
        setState({...state, error: {}})
        return true;
    }

    //Handle Sign up button click event
    const onSubmit = () => {
        // validate all field if it is true then proceed with action call
        if (validateCredentials()) {
            const {email, password, dateOfBirth, gender} = state;
            const payload = {
                email, password, dateOfBirth, gender
            }
            // Set isLoading true
            setState({...state, isLoading: true})
            registerUser(payload).then((response) => {
                //If response has 201 status code then show success message and redirect user to login page else show error message
                if (response.statusCode === 201) {
                    toast.success(response.message);
                    setState(defaultState)
                    history.push("/login")
                } else {
                    toast.error(response.message);
                    setState({...state, isLoading: false});
                }
            }).catch((e) => {
                toast.error(e.message);
                setState({...state, isLoading: false});
            })
        }
    }

    return (
        <div className={"login-page-wrapper"}>
            <div className={"login-item-wrapper"}>
                <h1>Registration</h1>
                <Input inputStyle={{"--in-color": "#9d49ee"}} label={"Email"} type="text" name={"email"}
                       placeholder={"Please enter your email"}
                       value={state.email} onChange={handleChange} error={state?.error?.email}/>

                <Input inputStyle={{"--in-color": "#9d49ee"}} label={"Password"} type="password" name={"password"}
                       placeholder={"Please enter your password"}
                       value={state.password}
                       onChange={handleChange}
                       error={state?.error?.password}/>

                <Input inputStyle={{"--in-color": "#9d49ee"}} label={"Confirm Password"} type="password"
                       name={"confirmPassword"}
                       placeholder={"Please re-enter your password"}
                       value={state.confirmPassword}
                       onChange={handleChange}
                       error={state?.error?.confirmPassword}
                />

                <div><span className={"input-label"}>Date of Birth</span>
                    <DatePicker
                        name={"dateOfBirth"}
                        placeholderText="YYYY/DD/MM"
                        dateFormat="yyyy/dd/MM"
                        peekNextMonth
                        showMonthDropdown
                        showYearDropdown
                        dropdownMode="select"
                        selected={state.dateOfBirth}
                        customInput={<ExampleCustomInput/>}
                        onChange={handleChangeDate}
                    />
                    {state?.error?.dateOfBirth ? <p className={"error-message"}>{state?.error?.dateOfBirth}</p> : ""}
                </div>
                <div>
                    <div className={"reg-radio-input-item-wrapper"}>
                        <span className={"input-label"}>Gender</span>
                        <div className={"reg-radio-input-wrapper"}>
                            <Input inputStyle={{"--in-color": "#9d49ee"}} type="radio" name={"gender"}
                                   id={"reg-male-radio"}
                                   value={"Male"}
                                   onChange={handleChange}/>
                            <Input inputStyle={{"--in-color": "#9d49ee"}} type="radio" name={"gender"}
                                   id={"reg-female-radio"}
                                   value={"Female"}
                                   onChange={handleChange}/>
                            <Input inputStyle={{"--in-color": "#9d49ee"}} type="radio" name={"gender"}
                                   id={"reg-other-radio"}
                                   value={"Other"}
                                   onChange={handleChange}/>
                        </div>
                    </div>
                    {state?.error?.gender ? <p className={"error-message"}>{state?.error?.gender}</p> : ""}
                </div>
                <Button buttonStyle={{fontSize: "1.3rem", "--btn-background": "#9d49ee"}} onClick={onSubmit}
                        disabled={state.isLoading}>
                    {state.isLoading ? <i className="fa fa-circle-o-notch fa-spin"/> : "Sign up"}
                </Button>
            </div>
        </div>)
}

export default RegistrationPage;
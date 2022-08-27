import React from 'react'
import {useHistory} from 'react-router-dom'
import Button from '../../components/Button'
import './landing.css'

const LandingPage = () => {
    const history = useHistory();
    return (
        <div className={"landing-page-wrapper"}>
            <div className={"landing-page-content-wrapper"}>
                <Button buttonStyle={{"--btn-background": "#9d49ee", width: "100%"}} onClick={() => {
                    history.push("/register")
                }}>
                    New user
                </Button>
                <div className="vl"/>
                <Button buttonStyle={{"--btn-background": "#9d49ee", width: "100%"}} onClick={() => {
                    history.push("/login")
                }}>
                    Existing User
                </Button>
            </div>
        </div>
    )
}

export default LandingPage
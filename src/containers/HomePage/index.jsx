import React, {useRef, useState} from 'react'
import {toast} from "react-toastify";
import CustomCard from "../../components/Card";
import CardInfo from "./HomePage.js"
import Button from "../../components/Button";
import "./HomePage.css"
import {logoutUser} from "../../actions/loginActions";

const HomePage = (props) => {
    const [isLoading, setIsLoading] = useState(false);
    const cardInfoRef = useRef(CardInfo);
    //Log out button click handler
    const onLogOutClicked = () => {
        //set isLoading to true so user can't click the button multiple times if request is in in progress state
        setIsLoading(true)
        logoutUser().then((response) => {
            if (response.error) {
                //show error to the user
                toast.error(response.message);
            } else {
                //show success message to the user
                toast.success(response.message);
                props.history.push("/")
            }
            //set isLoading to false
            setIsLoading(false)
        }).catch((error) => {

            //show error to the user
            toast.error(error.message);
            setIsLoading(false)
        })
    }
    return (
        <div style={{height: "100%", overflowY: "auto"}}>
            <div className={"header"}><p>Home</p><Button
                buttonStyle={{"--btn-background": "#9d49ee", fontSize: "1rem", minWidth: "8em"}} disabled={isLoading}
                onClick={onLogOutClicked}>{isLoading ?
                <i className="fa fa-circle-o-notch fa-spin"/> : "Log out"}</Button></div>
            <div className={"card-wrapper"}>
                {cardInfoRef.current.map((value, index) => {
                    return <CustomCard {...value} key={"card_" + index} index={index}/>
                })}
            </div>
        </div>
    )
}

export default HomePage
import React from "react";
import {Redirect, Route, Switch, withRouter} from "react-router-dom";
import {ToastContainer} from "react-toastify";
import LandingPage from './containers/LandingPage'
import LoginPage from "./containers/LoginPage";
import RegistrationPage from "./containers/RegistrationPage";
import HomePage from "./containers/HomePage";
import './App.css'
import "react-datepicker/dist/react-datepicker.css";
import 'react-toastify/dist/ReactToastify.css';
import PageNotFound from "./containers/404Page";

const publicPath = {
    "/register": true,
    "/login": true,
    "/": true,
}

// Restrict the user from visiting authenticated routes
function CheckPermission(props) {
    const isAuthenticated = !!localStorage.getItem("currentUser");
    if (!isAuthenticated && !publicPath[props.history.location.pathname]) {
        return <Redirect to={"/"}/>
    } else if (isAuthenticated && publicPath[props?.history?.location?.pathname]) {
        return <Redirect to={"/home"}/>
    }
    return false;
}


function App() {
    return (
        <div className="App" style={{height: "100vh"}}>
            <Switch>
                <Route path={"/home"} exact={true}
                       render={(props) => (CheckPermission(props) || <HomePage {...props}/>)}/>
                <Route path={"/register"} exact={true}
                       render={(props) => (CheckPermission(props) || <RegistrationPage {...props}/>)}/>
                <Route path={"/login"} exact={true}
                       render={(props) => (CheckPermission(props) || <LoginPage {...props}/>)}/>
                <Route path={"/"} exact={true}
                       render={(props) => (CheckPermission(props) || <LandingPage {...props}/>)}/>
                <Route
                       component={PageNotFound}/>
            </Switch>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss={false}
                draggable
                pauseOnHover theme={"dark"}/>
        </div>
    );
}

export default withRouter(App);

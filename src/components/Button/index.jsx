import React from 'react';
import './button.css';

const CustomButton = ({onClick, buttonStyle = {}, disabled, children}) => {
    return (
        <button className={"button-wrapper"} style={buttonStyle} disabled={disabled}
                onClick={onClick}>{children}</button>
    )
}
export default CustomButton
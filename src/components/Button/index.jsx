import React from 'react';
import PropTypes from 'prop-types';
import './button.css';

const CustomButton = ({onClick, buttonStyle = {}, disabled, children}) => {
    return (
        <button className={"button-wrapper"} style={buttonStyle} disabled={disabled}
                onClick={onClick}>{children}</button>
    )
}
CustomButton.propTypes = {
    disabled: PropTypes.bool,
    onClick: PropTypes.func.isRequired,
    }
export default CustomButton
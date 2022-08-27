import React, {useRef} from 'react'
import './input.css'

const CustomInput = ({Icon, label, inputStyle = {}, error, ...props}) => {
    const inputRef = useRef()
    return (
        <div className={"input-item-wrapper"} style={{width: "100%"}} onFocus={() => {
            if (inputRef.current) inputRef.current.focus()
        }}>
            {label ? <span style={inputStyle} className={"input-label"}>{label}</span> : ""}
            <div tabIndex="0" className={"input-wrapper"} style={inputStyle}>
                {props.type === "radio" ? (
                    <label htmlFor={props.id} style={{flexGrow: 1}}>{props?.value}</label>
                ) : (
                    ""
                )}
                <input
                    ref={(me) => inputRef.current = me}
                    {...props}
                />
            </div>
            {error ? <p className={"error-message"}>{error?.trim()}</p> : ""}
        </div>
    )
}

export default CustomInput;
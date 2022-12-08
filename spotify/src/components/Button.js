import React, {useState} from 'react'
import './Button.css'

const STYLES = [
    'btn--primary',
    'btn--outline'
]

const SIZES = [
    'btn--medium',
    'btn--large'
]

export const Button = ({
    children,
    type,
    onClick,
    buttonStyle,
    buttonSize
}) => {
    const checkButtonStyle = STYLES.includes(buttonStyle) ? buttonStyle : STYLES[0]
    const checkButtonSize = SIZES.includes(buttonSize) ? buttonSize : SIZES[0]
    const [active, setActive] = useState("");
    function loginACB()
    {
        window.location.pathname = '/login'
    }
    return (
        <button className= {`btn ${checkButtonStyle} ${checkButtonSize} `} onClick= {loginACB} type = {type}>{children}</button>
    );
}
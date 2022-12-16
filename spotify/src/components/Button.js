import React, {useState} from 'react'
import './Button.css'
import Login from './LogIn/LogIn'

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
    function logoutACB(){
        window.location='/logout'
    }
    return (
        <button className= {`btn ${checkButtonStyle} ${checkButtonSize} `} onClick= {children==="Log Out"?logoutACB:loginACB} type = {type}>{children}</button>
    );
}
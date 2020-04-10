import React from 'react'
import LogoImg from '../../../assets/Nook_Inc.png';
import classes from './Logo.module.css'
const Logo = props => (

    // <div className={classes.LogoContainer}>
       <div className={classes.Logoborder}>
            <img src={LogoImg} alt="Logo" className={classes.LogoImg}/>
        </div>
    // </div>
)

export default Logo;
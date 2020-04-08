import React from 'react'; 
import classes from './CheckMark.module.css'

const checkmark = (props) => {

    return (props.caught ? 
        <div className={classes.checkmarkContainer}>
            <div className={classes.checkmarkActive} onClick={props.uncheck}></div>
        </div> : 
        <div className={classes.checkmarkContainer} onClick={props.clicked}>
            <div className={classes.checkmark}></div>
        </div>
        )

}

export default checkmark;
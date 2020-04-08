import React from 'react'; 
import classes from './Star.module.css'


const star = (props) => {

    console.log(props.important)

    return (props.important ?  
        <div className={classes.starContainer}>
            <div className={classes.star + " " + classes.starActive} onClick={props.uncheck}></div> 
       </div> : 
        <div className={classes.starContainer}>
            <div className={classes.star} onClick={props.clicked}></div>
       </div>
       )
    
  
}

export default star; 
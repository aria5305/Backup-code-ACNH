import React from 'react'; 
import classes from './Month.module.css'


const Month = (props) => (

    props.active ? <div className={classes.MonthActive}>{props.children}</div> : <div className={classes.Month}>{props.children}</div>
)

export default Month;
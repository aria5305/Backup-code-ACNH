import React from 'react'; 
import classes from './Months.module.css'

const Months = (props) => (

<div className={classes.Container}>
    {props.children}
</div>

)

export default Months
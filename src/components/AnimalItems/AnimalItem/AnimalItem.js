import React from 'react'; 
import classes from './AnimalItem.module.css'
const AnimalItem = props => (
    
    <div className={classes.AnimalItem} onClick={props.clicked}>
        {props.children}
        <p className={classes.content}>{props.name}</p>
        <p className={classes.content}>$ {props.price}</p>
    </div>


)

export default AnimalItem;
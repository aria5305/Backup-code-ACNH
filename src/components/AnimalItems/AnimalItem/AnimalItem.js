import React from 'react'; 
import classes from './AnimalItem.module.css'
const AnimalItem = props => (
    

    
    <div className={classes.AnimalItem} >
        {props.children}
        <p className={classes.content} onClick={props.clicked}>{props.name}</p>
        <p className={classes.content} onClick={props.clicked}>$ {props.price}</p>
    </div>


)

export default AnimalItem;
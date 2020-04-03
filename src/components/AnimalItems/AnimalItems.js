import React from 'react'; 
import classes from './AnimalItems.module.css';

const AnimalItems = props => (
    
    <div className={classes.AnimalItems}>
        {props.children}
    </div>


)

export default AnimalItems;
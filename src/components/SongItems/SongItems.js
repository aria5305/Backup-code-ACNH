import React from 'react'; 
import classes from './SongItems.module.css'; 

const SongItems = props => (
    <div className={classes.SongsContainer}>
        {props.children}
    </div>
)



export default SongItems
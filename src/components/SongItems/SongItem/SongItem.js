import React from 'react'; 
import classes from './SongItem.module.css'; 


const SongItem = props => {
    
    let secret = classes.SongItem;
    let secretText = null;

    if(props.mood ==="Request only"){
        secret = classes.SongItem + " " +classes.secret
        secretText = "obtained via song request ONLY"
    }

    return (
    <div className={secret}>
        
        <div className={classes.children}>{props.children}</div>
        <h1 className={classes.songHeader}>{props.name}</h1>

        <span className={classes.secretText}>{secretText}</span>

    </div>
    )
}

export default SongItem;
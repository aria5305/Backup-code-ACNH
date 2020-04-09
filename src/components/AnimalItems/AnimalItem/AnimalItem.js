import React from 'react'; 
import classes from './AnimalItem.module.css'
const AnimalItem = props => {
    

    let className = classes.AnimalItem;
    let color = null;
    let show;
    
    if(props.class ==="comingSoon") {
    className = classes.AnimalItem + " " + classes.comingSoon; 
    color = classes.notice;
    show = "Coming next month!"
    }


    if(props.class === "leavingSoon") {
    className = classes.AnimalItem + " " + classes.leavingSoon; 
    color = classes.warning;
    show = "Leaving soon!";
    }
    if(props.class ==="AnimalItem"){
        show = "placeholder";
        color = classes.hidden;
    }

    return(
    <div className={className} >
        <span className={color}>{show}</span>
        <div className={classes.children}>{props.children}</div>
        <p className={classes.content} onClick={props.clicked}>{props.name}</p>
        <p className={classes.content} onClick={props.clicked}>$ {props.price}</p>
    </div>
    )


 }

export default AnimalItem;
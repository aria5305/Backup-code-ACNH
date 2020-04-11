import React from 'react'; 
import heroImage from '../../../assets/Tom_Nook.png'
import classes from './Hero.module.css';

const hero = props => (

    <div className={classes.Hero}>
       
   
       <div className={classes.NookBox}>
       <img src={heroImage} alt="tom_nook" className={classes.tomNook}/>
       
        <div className={classes.intro}>
            <h1 className={classes.heroText}>Nook's Library</h1>
        </div>
        </div>
 
            <div className={classes.descriptionBox}>
                <p className={classes.description}>This site is made as a fan-made website to provide useful information such as Fish/Insects details for Animal Crossing: New Horizons.</p> 
                <p className={classes.description}>This website is in no way affiliated with Nintendo.</p>
            </div>
    </div>
)

export default hero;
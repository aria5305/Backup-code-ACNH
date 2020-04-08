import React from 'react'; 
import heroImage from '../../../assets/Tom_Nook.png'
import classes from './Hero.module.css';

const hero = props => (

    <div className={classes.Hero}>
       
       <img src={heroImage} alt="tom_nook" className={classes.tomNook}/>
        <div className={classes.intro}>
            <h1 className={classes.heroText}>Animal Crossing Guide</h1>
            <p className={classes.description}>This is where you can find helpful information for fish/insects, such as time/locations/months which the species appears</p>
            <p className={classes.description}>All Data have been collected and gathered from <a href="https://www.doumori.com/">Doumori</a>   </p>

            {/* <p className={classes.description}>Disclaimer: All rights reversed by Nintendo.  This is only a passion project, I am not associated with Nintendo in any way.</p> */}
        </div>

    
     
    </div>
)

export default hero;
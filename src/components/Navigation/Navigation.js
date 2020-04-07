import React from 'react'; 
import classes from './Navigation.module.css';
import NavigationItems from './NavigationItems/NavigationItems';
import Logo from '../UI/Logo';

const navigation = (props) => (
    <nav className={classes.Navigation}>
        <Logo/>
     
        <NavigationItems></NavigationItems>
    </nav>

)

export default navigation;
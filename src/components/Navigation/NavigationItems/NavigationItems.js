import React from 'react'; 
import classes from './NavigationItems.module.css';
import NavigationItem from './NavigationItem/NavigationItem';

const navigationItems = (props) => (

    <ul className={classes.NavigationItems}>
        <NavigationItem clicked={props.clicked}link='/' exact>Home</NavigationItem>
        <NavigationItem  clicked={props.clicked} link='/fish'>Fish</NavigationItem>
        <NavigationItem   clicked={props.clicked} link='/insects'>Insects</NavigationItem>
        {/* <NavigationItem   clicked={props.clicked} link='/villagers'>Villagers</NavigationItem> */}
        <NavigationItem   clicked={props.clicked} link='/records'>Records</NavigationItem>
    </ul>
)

export default navigationItems;

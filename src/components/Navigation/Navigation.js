import React from 'react'; 
import classes from './Navigation.module.css';
import NavigationItems from './NavigationItems/NavigationItems';
import Logo from '../UI/Logo/Logo';
import DrawerToggle from './SideDrawer/DrawerToggle/DrawerToggle'
const navigation = (props) => (

  
    <header className={classes.Header}>
        <DrawerToggle click={props.clicked}></DrawerToggle>
            <div className={classes.DesktopOnly}>
                <Logo />
            </div>
        <nav className={classes.DesktopOnly}>
            <NavigationItems></NavigationItems>
        </nav>
    </header>



// <header className={classes.Toolbar}>
// <DrawerToggle click={props.clicked}/>
//     <div className={classes.Logo}>
//         <Logo/>
//     </div>
// <nav className={classes.DesktopOnly}>
//    <NavigationItems/>
// </nav>
// </header>

)

export default navigation;
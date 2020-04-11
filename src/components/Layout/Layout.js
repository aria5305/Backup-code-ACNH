import React,{Component} from 'react'
import Aux from '../../hoc/Auxillary';
import classes from './Layout.module.css'
// import Toolbar from '../Navigation/Toolbar/Toolbar'

import Navigation from '../Navigation/Navigation'
import SideDrawer from '../Navigation/SideDrawer/SideDrawer'

class layout extends Component {
    constructor(props){
        super(props)
        this.state = {
            showSideDrawer:false
        }
    }

    sideDrawerClosedHandler = () => {
        this.setState({showSideDrawer:false})
    }
    sideDrawerOpenHandler = () => {
        this.setState( (prevState)=> {
            return { showSideDrawer:!this.state.showSideDrawer}
        })
    }
    render(){
        return(
            <div className={classes.Layout}>
                <div className={classes.Header}>
                    <Navigation clicked={this.sideDrawerOpenHandler}/>
                    <SideDrawer open={this.state.showSideDrawer} closed={this.sideDrawerClosedHandler}/>
                </div>
                <main className={classes.Content}>
                        {this.props.children}
                </main>
            </div>
          
        )
    }
 
}

export default layout;
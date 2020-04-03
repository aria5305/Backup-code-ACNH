import React, {Component} from 'react'; 
import classes from './M.module.css';
import Backdrop from './Backdrop'; 
import Aux from '../../hoc/Auxillary'

const translate0 = 'translateY(0)';
const translateUp = 'translateY(-100vh)';


class Modal extends Component{

    shouldComponentUpdate(nextProps,nextState){
        return nextProps.show !== this.props.show || this.props.children !== nextProps.children
    }

    render(){


    return (
        <Aux>
            <Backdrop 
            show={this.props.show}
            clicked={this.props.clicked}
            />
                <div 
                    className={classes.container}
                       style={{
                        transform: (this.props.show) ?  translate0 : translateUp,
                        opacity:this.props.show ? '1' : '0'
                    }}>
                 
                            {this.props.children}
                </div>

   
        </Aux>


)
                }
}

export default Modal



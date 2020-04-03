import React from 'react';
import classes from './Button.module.css'

class Button extends React.Component {
  
  
    render() {
        
    return (
        <button value={this.props.value} onClick={e => this.props.click(e)} 
            className={classes.btn}
      
        >
          {this.props.value}
        </button>
    )
      
    }
  }

  export default Button
import React from 'react';
import classes from './Button.module.css'

class Button extends React.Component {

  constructor(props){
    super(props)
    this.state ={
      active:true,
      disabled:true
    }
  }

  


    render() {
        console.log(this.props.Northern)

        if(this.props.Northern) {
          return <button value={this.props.value} onClick={e => {this.props.click(e)}} 
          className={classes.btn + " " + classes.btnActive}>
            {this.props.value}
          </button>
       
        }else if(!this.props.Northern){
          return <button value={this.props.value} onClick={e => {this.props.click(e)}} 
          className={classes.btn}>
            {this.props.value}
          
          </button>
        }
 
      }
  
    }

  export default Button
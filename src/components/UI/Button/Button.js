import React from 'react';
import classes from './Button.module.css'

// class Button extends React.Component {

//     render() {
 

 const button = props => {   
   
          
        if(props.Northern || props.hideCaught||props.showImportant) {
          return <button value={props.value} onClick={e => {props.click(e)}} 
          className={classes.btn + " " + classes.btnActive}>
            {props.value}
          </button>
       
        }else if(!props.Northern || !props.hideCaught || !props.showImportant){
          return <button value={props.value} onClick={e => {props.click(e)}} 
          className={classes.btn}>
            {props.value}      
          </button>
        }

      }
    


  export default button;
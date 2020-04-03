import React from 'react'; 
import DropDownItem from './DropDownItem';
import classes from './DropdownList.module.css'

const dropdownList = props => {
    let item; 
    if(props.months){
    item = props.months.map(month => {
        month = month.charAt(0).toUpperCase() + month.slice(1);
        return <DropDownItem value={month} changed={props.changed} key={month}/>
    })
    }

    return (
    <div className={classes.DropDown} data-control="checkbox-dropdown">

      <label className={classes.dropdownLabel}>Select</label>
          
        <div className={classes.dropdownList}>
            <button value={props.buttonValue}data-toggle="check-all" className={classes.dropdownOption} 
            onClick={(event)=> props.checked(event)}>
               {props.buttonValue}
            </button>
            
            {item}
        </div>

    </div>
        )
}
export default dropdownList
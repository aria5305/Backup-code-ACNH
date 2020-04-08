import React, {Component} from 'react'; 
import classes from './SearchFields.module.css'
import Button from '../Button/Button'


class SearchFields extends Component {
    constructor(props){
        super(props)
        this.state = {
            values: [], 
            focusedValue: -1, 
            isFocused: false,
            isOpen:false,
            default:false,
            time:["00:00","01:00","02:00","03:00","04:00","05:00","06:00","07:00","08:00","09:00",
            "10:00","11:00","12:00","13:00","14:00","15:00","16:00","17:00","18:00","19:00","20:00",
            "21:00","22:00","23:00"],
            locationInsects:["Flying","Flowers(Hybrid)","On white flowers","On flowers","Tree stumps",
            "Shaken tree","On trees","Snowballs","Ground"],
            locationFish:["River","Pond","Ocean","High altitude","Pier","River Mouth","Ocean(Raining)"],
            timeSelected:"Select a time",
            locationSelected:"Select a location"


        }
     
    }
    
    clearFilterHandler = () => {

        this.setState({
            values: [], 
            focusedValue: -1, 
            isFocused: false,
            isOpen:false,
            default:true,
            timeSelected:"Select a time",
            locationSelected:"Select a location"
        })

    }

    
    timeSelectHandler = (event) => {
      
        this.setState({timeSelected:event.target.value})
    }

    locationSelecteHandler = (event) => {
        this.setState({locationSelected:event.target.value})
    }

    onFocus = () => {
        this.setState({isFocused:true})
    }

    onBlur = () => {
        const { options , multiple } = this.props
        this.setState(prevState => {
            const {values} = prevState

            if(multiple) {
                return {
                    focusedValue:-1,
                    isFocused:false,
                    isOpen:false
                }
            }
        })
    }

    onClick = () =>{
        this.setState(prevState =>({
            isOpen: !prevState.isOpen
        }))
    }

    onDeleteOption= (e) => {
        const{value} = e.currentTarget.dataset

        this.setState(prevState => {
            const [...values] = prevState.values
            const index = values.indexOf(value)

            values.splice(index,1)
            return {values}
        })
    }

    onHoverOption = (e)=> {
        const {options} = this.props 

        const {value} = e.currentTarget.dataset
        const index = options.findIndex(option => option.value === value)

        this.setState({
            focusedValue:index
        })
    }

    onClickOption = (e) =>{
        this.props.clicked(e);
        const {multiple} = this.props
        const {value} = e.currentTarget.dataset

        this.setState(prevState => {
            const [...values] = prevState.values
            const index = values.indexOf(value)

            if(index === -1){
                values.push(value)
            }else{
                values.splice(index,1)
            }
            // console.log(values)
            return {values,default:false}
           
        })
    }

    stopPropagation = (e) =>{
        e.stopPropagation();
    }

    renderValues = () =>{
        const {placeholder, multiple } = this.props
        const {values} = this.state

        if(values.length === 0){
            return (
                <div className={classes.placeholder}>
                    {placeholder}
                </div>
            )
        }
        
        // if(multiple){
            return values.map(val => {
                return (
                    <span 
                    key = {val}
                    onClick ={this.stopPropagation}
                    className={classes.multiple + " " + classes.value}>
                       {val}
                  
                    <span data-value ={val}
                    onClick={(e)=> {
                        this.onDeleteOption(e)
                        this.props.deleted(e)}}
                    className={classes.delete}>

                        <X/>

                    </span>
                    </span>
   
                )
            })
        
    }

    renderOptions= ()=>{
        const {options} = this.props
        const {isOpen} = this.state; 

        if(!isOpen){
            return null
        }

        return (
            <div className={classes.options}>
                {options.map(this.renderOption)}
            </div>
        )
    }

    renderOption= (option,index)=>{
        const {multiple} = this.props;
        const {values, focusedValue} = this.state;

        const {value} = option

        const selected = values.includes(value)

        let className = classes.option;
        if(selected)  className = classes.option  + " " + classes.selected;
        if(index === focusedValue) className = classes.option + " " + classes.focused

        return (
            <div
                key={value}
                data-value={value}
                className={className}
                onMouseOver={this.onHoverOption}
                onClick={this.onClickOption}>
            
            <span className="checkbox">
            { selected ? <Check /> : null }
            </span>
                {value}
               
            </div>
        )

    }



    render(){
   
        const {isOpen} = this.state
  
        return (

            <div className={classes.container}>
                
              <div className ={classes.select}
                  tabIndex="0"
                  onFocus = {this.onFocus}
                  onBlur = {this.onBlur}
              >

                  <div 
                  className={classes.selection}
                  onClick={this.onClick}>
                    
                      {this.renderValues()}
            
                  <span className={classes.arrow}>
                      {isOpen ? <ChevronUp/> : <ChevronDown/>}
                  </span>
  
                  </div>
                {this.renderOptions()}
              </div>
              

              <div>
                      
                        <select
                        value={this.state.timeSelected}
                        className={classes.singleSelect} id="time" 
                        onChange={(event) => {this.props.timeSelected(event); this.timeSelectHandler(event)}}>
                            <option disabled>Select a time</option>
                        {this.state.time.map(t => {
                            return <option>{t}</option>
                        })}
                        </select>
                </div>





            
                <div>
                        {/* <label  className={classes.label}>Location:</label> */}

                    { (this.props.type === "insects") ? (
                        <select  value={this.state.locationSelected} className={classes.singleSelect} id="location" 
                        onChange={(event) => {this.props.locationSelected(event)
                                            this.locationSelecteHandler(event)}}>
                             <option disabled>Select a location</option>
                             {this.state.locationInsects.map(t => {
                            return <option>{t}</option>
                        })}


                        </select>) : (
                        <select 
                        value={this.state.locationSelected}
                            className={classes.singleSelect} 
                            id="location" onChange={(event) => {this.props.locationSelected(event)
                                this.locationSelecteHandler(event)}}>
                            <option disabled>Select a location</option>
                            {this.state.locationFish.map(t => {
                            return <option>{t}</option>
                        })}
                        </select>)
                    }
            <Button class="btn" value="Clear filters" click={() => {this.clearFilterHandler(); this.props.doubleClick();}}/>
               
            </div>
            </div>
        )
    }
}

export default SearchFields;


const X = () => (
    <svg viewBox="0 0 16 16">
      <path d="M2 .594l-1.406 1.406.688.719 5.281 5.281-5.281 5.281-.688.719 1.406 1.406.719-.688 5.281-5.281 5.281 5.281.719.688 1.406-1.406-.688-.719-5.281-5.281 5.281-5.281.688-.719-1.406-1.406-.719.688-5.281 5.281-5.281-5.281-.719-.688z" />
    </svg>
  )

  const Check = () => (
    <svg viewBox="0 0 16 16">
      <path d="M13 .156l-1.406 1.438-5.594 5.594-1.594-1.594-1.406-1.438-2.844 2.844 1.438 1.406 3 3 1.406 1.438 1.406-1.438 7-7 1.438-1.406-2.844-2.844z" transform="translate(0 1)" />
    </svg>
  )

 

  
const ChevronDown = () => (
    <svg viewBox="0 0 10 7">
      <path d="M2.08578644,6.5 C1.69526215,6.89052429 1.69526215,7.52368927 2.08578644,7.91421356 C2.47631073,8.30473785 3.10947571,8.30473785 3.5,7.91421356 L8.20710678,3.20710678 L3.5,-1.5 C3.10947571,-1.89052429 2.47631073,-1.89052429 2.08578644,-1.5 C1.69526215,-1.10947571 1.69526215,-0.476310729 2.08578644,-0.0857864376 L5.37867966,3.20710678 L2.08578644,6.5 Z" transform="translate(5.000000, 3.207107) rotate(90.000000) translate(-5.000000, -3.207107) " />
    </svg>
  )
  
  const ChevronUp = () => (
    <svg viewBox="0 0 10 8">
      <path d="M2.08578644,7.29289322 C1.69526215,7.68341751 1.69526215,8.31658249 2.08578644,8.70710678 C2.47631073,9.09763107 3.10947571,9.09763107 3.5,8.70710678 L8.20710678,4 L3.5,-0.707106781 C3.10947571,-1.09763107 2.47631073,-1.09763107 2.08578644,-0.707106781 C1.69526215,-0.316582489 1.69526215,0.316582489 2.08578644,0.707106781 L5.37867966,4 L2.08578644,7.29289322 Z" transform="translate(5.000000, 4.000000) rotate(-90.000000) translate(-5.000000, -4.000000) " />
    </svg>
  )
 

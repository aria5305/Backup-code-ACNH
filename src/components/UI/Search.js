import React,{Component} from 'react'; 
import classes from './Search.module.css';
import Button from '../UI/Button';
import DropdownList from './DropdownList'

class Search extends Component{



    render(){
    

        return (<div className={classes.container}>
            <h2>Filters:</h2>
    
           <div className={classes.hemisphereContainer}>
        
        
                <Button Northern={this.props.Northern} value="Northern Hemisphere" click={this.props.clicked}/>

                <Button Northern={!this.props.Northern} value="Southern Hemisphere" click={this.props.clicked}/>
                   
    
           </div>
    
    
            <div className={classes.Search}>

                    <DropdownList
                    placeholder="Select a month/months"
                    clicked={this.props.monthSelected}
                    deleted={this.props.monthDeleted}
                    options={[
                        {value:"jan"},
                        {value:"feb"},
                        {value:"mar"},
                        {value:"apr"},
                        {value:"may"},
                        {value:"jun"},
                        {value:"jul"},
                        {value:"aug"},
                        {value:"sep"},
                        {value:"oct"},
                        {value:"nov"},
                        {value:"dec"},
                    ]}
                    multiple
                    />
                

    
                <div>
                        <label  className={classes.label}>Time:</label>
                        <select className={classes.select} id="time" onChange={(event) => this.props.timeSelected(event)}>
                            <option value="0">Select a time</option>
                            <option>0:00</option>
                            <option>01:00</option>
                            <option>02:00</option>
                            <option>03:00</option>
                            <option>04:00</option>
                            <option>05:00</option>
                            <option>06:00</option>
                            <option>07:00</option>
                            <option>08:00</option>
                            <option>09:00</option>
                            <option>10:00</option>
                            <option>11:00</option>
                            <option>12:00</option>
                            <option>13:00</option>
                            <option>14:00</option>
                            <option>15:00</option>
                            <option>16:00</option>
                            <option>17:00</option>
                            <option>18:00</option>
                            <option>19:00</option>
                            <option>20:00</option>
                            <option>21:00</option>
                            <option>22:00</option>
                            <option>23:00</option>
                        </select>
                </div>





            
                <div>
                        <label  className={classes.label}>Location:</label>

                    { (this.props.type === "insects") ? (
                        <select className={classes.select} id="location" onChange={(event) => this.props.locationSelected(event)}>
                            <option value="0" selected disabled>Select a location</option>
                            <option>Flying</option>
                            <option>Flowers(Hybrid)</option>
                            <option>On white flowers</option>
                            <option>On flowers</option>
                            <option>Tree stumps</option>
                            <option>Shaken tree</option>
                            <option>On trees</option>
                            <option>Snowballs</option>
                            <option>Ground</option>
                        </select>) : (
                        <select className={classes.select} id="location" onChange={(event) => this.props.locationSelected(event)}>
                            <option value="0" selected disabled>Select a location</option>
                            <option>River</option>
                            <option>Pond</option>
                            <option>Ocean</option>
                            <option>High altitude</option>
                            <option>Pier</option>
                            <option>River Mouth</option>
                            <option>Ocean(Raining)</option>
                        </select>)
                    }
                       
    
                </div>

                <Button className="btn" value="Clear Filters" click={this.props.clearFilters}></Button>
            </div>
        
            </div>
    )
    }
   
}

export default Search
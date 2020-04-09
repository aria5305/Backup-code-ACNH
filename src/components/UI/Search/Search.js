import React,{Component} from 'react'; 
import classes from './Search.module.css';
import Button from '../Button/Button';
import SearchFields from '../SearchFields/SearchFields'

class Search extends Component{



    render(){
   

        return (<div className={classes.container}>
            
           <div className={classes.hemisphereContainer}>
        
        
                <Button Northern={this.props.Northern} value="Northern Hemisphere" click={this.props.clicked}/>

                <Button Northern={!this.props.Northern} value="Southern Hemisphere" click={this.props.clicked}/>
                
              
           </div>
           
    
    
            <div className={classes.Search}>

                    <SearchFields
                    doubleClick={this.props.clearFilters}
                    placeholder="Select a month/months"
                    clicked={this.props.monthSelected}
                    deleted={this.props.monthDeleted}
                    type={this.props.type}
                    locationSelected={this.props.locationSelected}
                    timeSelected={this.props.timeSelected}
                 
                    setCurrent={this.props.setCurrent}
             
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
                       
    
                </div>
                
               
                {!this.props.showImportantOnly ? (<Button 
                    showImportant ={this.props.showImportantOnly}
                    value="Show important Only"
                    click={this.props.showImportantHandler}/>)
                    :
                    (  <Button 
                        showImportant ={this.props.showImportantOnly}
                        value="Go back to showing all"
                        click={this.props.showImportantHandler}/>)
                 }

                 {!this.props.hideCaught 
                 ?<Button value="Hide all caught" hideCaught={this.props.hideCaught}click={this.props.hideCaughtHandler}/>
                 :<Button value="Show all fish(incl. caught)"hideCaught={this.props.hideCaught} click={this.props.hideCaughtHandler}/>
                }
              
             
                <Button class="btn" value="Clear all important" click={this.props.clearAllImportant}/>
                
               
            </div>
        

    )
    }
   
}

export default Search
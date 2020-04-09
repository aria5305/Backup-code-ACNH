import React,{Component} from 'react';
import AnimalItem from '../../components/AnimalItems/AnimalItem/AnimalItem';
import AnimalItems from '../../components/AnimalItems/AnimalItems';
import Navigation from '../../components/Navigation/Navigation';
import * as INSECTS_INFO from '../../assets/data/BugsInfo';
import M from '../../components/UI/Modal/M'
import Search from '../../components/UI/Search/Search'
import Months from '../../components/Months/Months';
import Month from '../../components/Months/Month/Month'
import classes from '../Fish/Fish.module.css';
import Star from '../../components/UI/Star/Star';
import CheckMark from '../../components/UI/CheckMarks/CheckMark';


class Insects extends Component{
    constructor(props){
        super(props)
        this.state = {
            insects:[],
            images:[],
            currentHemisphere:"Northern",
            Northern:true,
            selectedInsect: {}, 
            loading:true,
            show:false,
            location:null,
            time:null,
            months:[],
            showImportantOnly:false,
            hideCaught:false,
            currentMonth:null
        }
    }

    importAll = (r) =>  {
        let images = {};
        r.keys().map((item, index) => { images[item.replace('./', '')] = r(item); });
        return images;
      }
      
        images = this.importAll(require.context('../../assets/insects', false, /\.(png|jpe?g|svg)$/));


    componentDidMount(){
        let path = Object.keys(this.images);
        path = path.sort((a, b) => a.length < b.length? -1: 1);

        const today = new Date(); 
        const month = today.getMonth(); 

        this.setState({
            insects:INSECTS_INFO.bugsapi,
            loading:false,
            images:path,
            currentMonth:month
        })
       
    }

    switchingHemisphere = (event) => {
        if(event.target.value === "Northern Hemisphere") 
            this.setState({currentHemisphere:"Northern",Northern:true})

        if(event.target.value ==="Southern Hemisphere") 
            this.setState({currentHemisphere:"Southern", Northern:false})
    }


    showAnimalDetails = (arr,imgArr,id) => {
        let info; 
        this.state.currentHemisphere === "Northern" ? 
        ( info =  {
            image: imgArr[id],
            name:arr[id].name,
            price:arr[id].price,
            time:arr[id].time,
            location:arr[id].location,
            activeMonths:arr[id].Northern
        }
        ) : 
        (info =  {
            image: imgArr[id],
            name:arr[id].name,
            price:arr[id].price,
            time:arr[id].time,
            location:arr[id].location,
            activeMonths:arr[id].Southern
        }) 

        this.setState({
            selectedInsect:info,
            show:true
        })

        console.log(info)

    }

    closeModal =() => {
        this.setState({
            show:false})
    }

    monthsHandler = (event) => {
        const {value} = event.currentTarget.dataset 

        this.setState(prevState => {
            const [...values] = prevState.months
            const index = values.indexOf(value); 

            if(index === -1){
                values.push(value)
            }else{
                values.splice(1,index) // add currentSelected to array
            }
            return {months:values}
        })
    }

    onMonthDeleteOption = (event) => {
        const {value} = event.currentTarget.dataset; 

        this.setState(prevState => {
            const [...months] = prevState.months
            const index = months.indexOf(value)

            months.splice(index, 1) //remove currentSelected from array

            return {months:months}
        })

    }

    locationHandler = (event)=> {
        this.setState({location:event.target.value})
    }

    timeHandler =(event) => {
        let time = event.target.value.slice(0,2); 
        if(time.indexOf(0) == "0") time = time.slice(1);
        this.setState({time:time})
    }

    clearFilterHandler = () => {
        this.setState({
            time:null,
            location:null,
            months:[],
            Northern:true,
            hideCaught:false,
            showImportantOnly:false
        })
    }

    markCaughtHandler = (name) => {

        let original = this.state.insects.slice();
        
        // fish[id].important = true; 
        
        original.map(f => {
            if(f.name === name){
                f.caught = true
        }
        });

        this.setState({insects :original})
      
    }

    clearCaughtHandler = (name) => {
        let original = this.state.insects.slice();
        
        // fish[id].important = true; 
        
        original.map(f => {
            if(f.name === name){
                f.caught = false
        }
        });

        this.setState({insects:original})
       
    }

    onImportantHandler = (name) => {
        
        let original = this.state.insects.slice();
        
        // fish[id].important = true; 
        
        original.map(f => {
            if(f.name === name){
                f.important = true
        }
        });

        this.setState({insects:original})

   
    }

    clearImportantHandler  = (name) => {
         

         
        let original = this.state.insects.slice();

        original.map(f => {
            if(f.name === name){
                f.important = false
        }
        });

        this.setState({insects:original})

       
    }

    clearAllImportant = () => {
        let insects = this.state.insects.slice();
        for(let i = 0; i < insects.length; i++){
                insects[i].important = false;
        }
   this.setState({
            insects:insects,
            showImportantOnly:false,
        })
    }

    showImportantHandler = () => {
        this.setState(prevState =>({
            showImportantOnly: !prevState.showImportantOnly
        }))
    }

    hideCaughtHandler = () => {
        this.setState(prevState => ({
            hideCaught:!prevState.hideCaught
        }))
    }

    renderUpdatedInsects = (arr) => {
        let filteredIMG=[];

       
        const months = Object.keys(this.state.insects[0].Northern);

        const nextMonth =  months[this.state.currentMonth + 1];//apr
        const currentMonth =  months[this.state.currentMonth];//apr
      
    

        return (
            
            <AnimalItems>
            {arr.map((f,index) => { 
                filteredIMG.push(f.id + ".jpg");

                                            
                if(f[this.state.currentHemisphere][currentMonth]  === 1 
                    && f[this.state.currentHemisphere][nextMonth] === 0)
    
                return  this.renderAnimalItem(f,index,arr,filteredIMG,"leavingSoon")

                else if (f[this.state.currentHemisphere][currentMonth]  === 0 
                    && f[this.state.currentHemisphere][nextMonth] === 1)
                return  this.renderAnimalItem(f,index,arr,filteredIMG,"comingSoon")

                else  return this.renderAnimalItem(f,index,arr,filteredIMG,"AnimalItem")


                // {(f[this.state.currentHemisphere][currentMonth]  === 0 
                // && f[this.state.currentHemisphere][nextMonth] === 1)?

                // <h1>I am Coming next month</h1> :
                // null}

                })}          
        </AnimalItems>
        )
    }


    renderAnimalItem = (f,index,arr,filteredIMG,className) => {
        return (
            <AnimalItem 
            class={className}
            key={f.name}
            name={f.name}
            price={f.price}
            important={f.important} 
            
            clicked={
                () => {
                this.showAnimalDetails(arr,filteredIMG,index)}}>
               <img style={{cursor:"pointer"}} src={this.images[f.id +".jpg"]} alt={f.name} onClick={()=> this.showAnimalDetails(arr,filteredIMG,index)}/>
                <Star 
                    clicked={() => this.onImportantHandler(f.name)} 
                    important={f.important} 
                    uncheck={()=> this.clearImportantHandler(f.name)}/>
                  <CheckMark 
                 clicked={() => this.markCaughtHandler(f.name)}
                 caught={arr[index].caught}
                 uncheck={()=> this.clearCaughtHandler(f.name)}/>
             
            </AnimalItem>
            )
        
    }

    

    setCurrentTimeAsFilter = () => {
        let today = new Date();
        let month = today.getMonth();
        let time = today.getHours();

        const months = Object.keys(this.state.insects[0].Northern)
        
        let updateMonths =[];
        updateMonths.push(months[month]);


        this.setState({months:updateMonths, time:time})

    }
    

    render(){
        
        let content = 'loading...';
        let insectInfo = null;
        let months; 

        if(this.state.loading === false){
           
            months = Object.keys(this.state.insects[0].Northern)

            let insects = this.state.insects.slice(); 

            if(this.state.location ||this.state.time ||this.state.months.length > 0 ||
                this.state.showImportantOnly === true||
                this.state.hideCaught === true){

                if(this.state.location){
                    insects = insects.filter(i => i.location === this.state.location)
                }

                if(this.state.time){
                    insects = insects.filter(i => {

                        if(i.time ==="All day") return true;

                        let first = i.time.slice(0,2); 
                            if(first.charAt(first.length-1) === ":") first = first.slice(0,1); 
                        let second = i.time.slice(i.time.length -5, i.time.length-3);

                        first = parseInt(first);
                        second = parseInt(second);
                        let target = parseInt(this.state.time);

                        if(first > second){
                            return target >=first || target <= second;
                        }else{
                            return target <= second && target >= first;
                        }
                    })
                }

                if(this.state.months.length > 0){

                    if(this.state.currentHemisphere ==="Northern"){
                        insects = insects.filter(f => {           
                                
                            let x=[]; 
                            for(const month of this.state.months){
                               
                               x.push(f.Northern[month] !== 0);

                            }      
                            return x.includes(true) ? true : false;
                        })
                    }
                    else{
                        insects = insects.filter(f => {           
                                
                            let x=[]; 
                            for(const month of this.state.months){
                               
                               x.push(f.Southern[month] !== 0);

                            }      
                            return x.includes(true) ? true : false;
                        })

                    }
                }

                if(this.state.showImportantOnly === true) {
                    insects = insects.filter(f => 
                        f.important === true
                    )
                }
            //filter caught = ignored caught
                if(this.state.hideCaught === true) {
                    insects = insects.filter (f => f.caught !== true)
                }
            

           

            content = this.renderUpdatedInsects(insects)
                
            
            }else if(this.state.showImportantOnly === false || this.state.hideCaught === false){
                content = this.renderUpdatedInsects(insects)
            }else{
                content = this.renderUpdatedInsects(this.state.insects);
 
            }
        }


        if(this.state.show) {
    

            const months = Object.keys(this.state.selectedInsect.activeMonths); 
            let active = []; 

            for(let i = 0; i<months.length; i++){
                if(this.state.selectedInsect.activeMonths[months[i]] !==0)
                active.push(months[i]);
            }

            let calendar = (
                <Months>
                    {months.map (month => {
                        if(active.includes(month)){
                            return (
                            <Month active key={month}>
                                {month.charAt(0).toUpperCase() + month.slice(1)}
                            </Month>
                            )
                        }else{
                            return (<Month key={month}> 
                            {month.charAt(0).toUpperCase() + month.slice(1)}
                            </Month>)
                        }
                    })}
                </Months>
            )
        
            insectInfo = (

                <div className={classes.infoContainer}>
                    <div className={classes.info}>
                        <img src={this.images[this.state.selectedInsect.image]} alt={this.state.selectedInsect.name + "Image"}/>
                        <div>    
                            <p>Name: {this.state.selectedInsect.name}</p>
                            <p>Price: {this.state.selectedInsect.price}</p>
                            <p>Time: {this.state.selectedInsect.time}</p>
                            <p>Location: {this.state.selectedInsect.location}</p>
                           
                        </div>
                    </div>

                    <div className={classes.calendarContainer}>
                        <p>Active Months:</p>
                        <div className={classes.calendar}>{calendar}</div>
                    </div>
                
                  
                
                  
                </div>
                

            )
        }


  
   
        return (
            <div>
                
             <Navigation/>
               
                <M show={this.state.show} clicked={this.closeModal}>
                       {insectInfo}
                </M>

                <Search 
                 type="insects"
                 clicked={this.switchingHemisphere}
                 Northern = {this.state.Northern}
                
                 currentTime={this.state.time}
                 currentMonth={this.state.months}
                 setCurrent={this.setCurrentTimeAsFilter}

                 clearFilters={this.clearFilterHandler}
                 locationSelected ={this.locationHandler}
                 timeSelected={this.timeHandler}
                 monthSelected={this.monthsHandler}
                 monthDeleted={this.onMonthDeleteOption}
 
                 clearAllImportant={() => this.clearAllImportant(this.state.insects)}
                 showImportantHandler={this.showImportantHandler}
                 showImportantOnly={this.state.showImportantOnly}
 
                 hideCaughtHandler = {this.hideCaughtHandler}
                 hideCaught = {this.state.hideCaught}/>
 

   
                {content}
            </div>
              
            
        )
    
}

}
export default Insects;


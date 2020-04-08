import React,{Component} from 'react';
import classes from './Fish.module.css';
import AnimalItem from '../../components/AnimalItems/AnimalItem/AnimalItem';
import AnimalItems from '../../components/AnimalItems/AnimalItems';
import Navigation from '../../components/Navigation/Navigation';
import * as FISH_INFO from '../../assets/data/FishInfo';
import M from '../../components/UI/Modal/M'
import Search from '../../components/UI/Search/Search'
import Months from '../../components/Months/Months';
import Month from '../../components/Months/Month/Month'
import Star from '../../components/UI/Star/Star';
import CheckMark from '../../components/UI/CheckMarks/CheckMark';

class Fish extends Component{
    constructor(props){
        super(props)
        this.state = {
            fish:[],
            images:[],
            currentHemisphere:"Northern",
            Northern:true,
            selectedFish: {}, 
            loading:true,
            show:false,         
            location:null,
            time:null,
            months:[],
            showImportantOnly:false,
            hideCaught:false,
        }
    }

    importAll = (r) =>  {
        let images = {};
        r.keys().map((item, index) => { images[item.replace('./', '')] = r(item); });
        return images;
      }
      
    images = this.importAll(require.context('../../assets/fish', false, /\.(png|jpe?g|svg)$/));


    componentDidMount(){

        let path = Object.keys(this.images);
        path = path.sort((a, b) => a.length < b.length? -1: 1);


        this.setState({
            fish:FISH_INFO.fishapi,
            loading:false,
            images:path
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
      
        (
        info =  {
            image: imgArr[id],
            name:arr[id].name,
            price:arr[id].price,
            time:arr[id].time,
            shadow:arr[id].shadow,
            location:arr[id].location,
            activeMonths:arr[id].Northern
            
        }
        
        ) : (
            info =  {
                image: imgArr[id],
                name:arr[id].name,
                price:arr[id].price,
                time:arr[id].time,
                shadow:arr[id].shadow,
                location:arr[id].location,
                activeMonths:arr[id].Southern    
            }   
        )

        this.setState({
            selectedFish:info,
            show:true
        })

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
                values.splice(index,1)
            }

            return {months:values}
        })        
    }

    onMonthDeleteOption= (e) => {
        const{value} = e.currentTarget.dataset

        this.setState(prevState => {
            const [...months] = prevState.months
            const index = months.indexOf(value)

            months.splice(index,1)
            return {months:months}
        })
    }


    locationHanlder  = (event) => {
        this.setState({location:event.target.value})
    }

    timeHandler = (event) => {
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
            showImportantOnly:false,
            hideCaught:false,
        })

        console.log(this.state.months);
    
       

    }


    markCaughtHandler = (arr,id) => {
        let fish = arr.slice();
        fish[id].caught = true; 
        this.setState({
            fish:fish
        })
    }

    clearCaughtHandler = (arr,id) => {
        let fish = arr.slice();
        fish[id].caught = false; 
        this.setState({
            fish:fish
        })
       
    }

    onImportantHandler = (arr,id) => {

        let fish = arr.slice();
        fish[id].important = true; 
      
        this.setState({
            fish:fish,
          
        })
   
    }

    clearImportantHandler  = (arr,id) => {
        let fish = arr.slice();
        fish[id].important = false; 
        this.setState({
            fish:fish
        })
       
    }

    clearAllImportant = (arr) => {
        let fish = arr.slice();
        for(let i = 0; i < fish.length; i++){
                fish[i].important = false;
        }
   this.setState({
            fish:fish,
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

    renderUpdatedFish = (arr) => {
        let filteredIMG=[];

        return (
            <AnimalItems>
            {arr.map((f,index) => { 
                filteredIMG.push(f.id + ".jpg");
                return (
                <AnimalItem 
                key={f.name}
                name={f.name}
                price={f.price}
                important={f.important} 
                
                clicked={
                    () => {
                    this.showAnimalDetails(arr,filteredIMG,index)}}>
    
                    <img style={{cursor:"pointer"}} src={this.images[f.id +".jpg"]} alt={f.name} onClick={()=> this.showAnimalDetails(arr,filteredIMG,index)}/>
                    <Star 
                        clicked={() => this.onImportantHandler(arr,index)} 
                        important={f.important} 
                        uncheck={()=> this.clearImportantHandler(arr,index)}/>
                      <CheckMark 
                     clicked={() => this.markCaughtHandler(arr,index)}
                     caught={arr[index].caught}
                     uncheck={()=> this.clearCaughtHandler(arr,index)}/>
                 
                </AnimalItem>
                )
            })}
    
        </AnimalItems>
        )
    }

    
     
  

    render(){
        
        let content = 'loading...';
        let fishInfo = null;
        let months;



    if(this.state.loading === false){
       
        months = Object.keys(this.state.fish[0].Northern)
        
            let fishes = this.state.fish.slice();

            if(this.state.location || 
                this.state.time || 
                this.state.months.length > 0 ||
                this.state.showImportantOnly === true||
                this.state.hideCaught === true){
            //filter by location
                if(this.state.location){
                    fishes = fishes.filter(f => f.location == this.state.location); 
                }
            //filter by time
          
                if(this.state.time){
                    
                    fishes = fishes.filter(f => {       
                        if(f.time ==="All day"){
                            return true;
                        }

                            let first = f.time.slice(0,2);
                                if(first.charAt(first.length -1) ===":") first =first.slice(0,1);
                            let second = f.time.slice(f.time.length - 5,f.time.length -3);
                            

                            first = parseInt(first)
                            second = parseInt(second);
                            let target = parseInt(this.state.time);

                                if(first > second) {
                                    return target >= first || target <= second; 

                                }else{  
                                    return target <= second && target >= first;
                                }
                    })

                        
                }
            //filter by months
                if(this.state.months.length > 0){

                    if(this.state.currentHemisphere ==="Northern"){
                        fishes = fishes.filter(f => {           
                                
                            let x=[]; 
                            for(const month of this.state.months){
                               
                               x.push(f.Northern[month] !== 0);

                            }      
                            return x.includes(true) ? true : false;
                        })
                    }
                    else{
                        fishes = fishes.filter(f => {           
                                
                            let x=[]; 
                            for(const month of this.state.months){
                               
                               x.push(f.Southern[month] !== 0);

                            }      
                            return x.includes(true) ? true : false;
                        })

                    }
                }
            //filter by importance only
                if(this.state.showImportantOnly === true) {
                    fishes = fishes.filter(f => 
                        f.important === true
                    )
                }
            //filter caught = ignored caught
                if(this.state.hideCaught === true) {
                    fishes = fishes.filter (f => f.caught !== true)
                }

                content = this.renderUpdatedFish(fishes)

                //if one of this is false => then return to the previous fishes filters
            }else if(this.state.showImportantOnly === false || this.state.hideCaught === false){
                content = this.renderUpdatedFish(fishes)
                //if both of these are false, then shold render the whole thing
            // }else if(this.state.showImportantOnly === false && this.state.hideCaught === false){
            //     content = this.renderUpdatedFish(this.state.fish)
              }else {

                content = this.renderUpdatedFish(this.state.fish)
            }
        }
           

    
    


    


    if(this.state.show) {


            const months = Object.keys(this.state.selectedFish.activeMonths)
    
            let active = []
    
            for(let i = 0; i < months.length; i++){
                if(this.state.selectedFish.activeMonths[months[i]] !== 0) 
                    active.push(months[i]);
            }
         
            let calendar = (
                   
                <Months>
                    {months.map(month =>{

                        if(active.includes(month)) {
                        
                        return <Month active
                        key={month}>{month.charAt(0).toUpperCase() + month.slice(1)}</Month> 

                        }else{
                            return <Month key={month}>{month.charAt(0).toUpperCase() + month.slice(1)}</Month>
                        }
               
                
        //    
                    })}

                </Months>
            )
           
      
            fishInfo = (

                <div className={classes.infoContainer}>
                    <div className={classes.info}>
                        <img src={this.images[this.state.selectedFish.image]} alt={this.state.selectedFish.name + "Image"}/>
                        <div>
                            <p>Name: {this.state.selectedFish.name}</p>
                            <p>Price: ${this.state.selectedFish.price}</p>
                            <p>Time: {this.state.selectedFish.time}</p>
                            <p>Location: {this.state.selectedFish.location}</p>
                            <p>Shadow: {this.state.selectedFish.shadow}</p>
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
                       {fishInfo}
                </M>

                <Search 
                type="fish"
                clicked={this.switchingHemisphere}
                Northern = {this.state.Northern}
               
                clearFilters={this.clearFilterHandler}
                locationSelected ={this.locationHanlder}
                timeSelected={this.timeHandler}
                monthSelected={this.monthsHandler}
                monthDeleted={this.onMonthDeleteOption}

                clearAllImportant={() => this.clearAllImportant(this.state.fish)}
                showImportantHandler={this.showImportantHandler}
                showImportantOnly={this.state.showImportantOnly}

                hideCaughtHandler = {this.hideCaughtHandler}
                hideCaught = {this.state.hideCaught}/>

             
                {content}
            </div>
              
            
        )
    
}

}
export default Fish;


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
            currentHemisphere:null,
            Northern:true,
            // activeButton:true,
            selectedFish: {}, 
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
      
    images = this.importAll(require.context('../../assets/fish', false, /\.(png|jpe?g|svg)$/));


    componentDidMount(){

       
        let path = Object.keys(this.images);
        path = path.sort((a, b) => a.length < b.length? -1: 1);

        const today = new Date(); 
        const month = today.getMonth(); 
     
        this.setState({
         
            images:path,
            currentMonth:month
        })
        this.getHemisphere();
        this.getLocalStorage();
        
    }

    switchingHemisphere = (event) => {
        if(event.target.value === "Northern Hemisphere") {
            if(this.state.currentHemisphere === "Northern"){
                return ;
            }else{
                this.setHemisphere("Northern");
                this.setState(({currentHemisphere:"Northern", Northern:true}))
            }
            
        }else{

            if(this.state.currentHemisphere === "Southern"){
                return ;
            }else{
                this.setHemisphere("Southern");
                this.setState(({currentHemisphere:"Southern", Northern:false}))
            }
           
           
        }

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
            showImportantOnly:false,
            hideCaught:false,
        })

     
       

    }


    markCaughtHandler = (name) => {

        let original = this.state.fish.slice();
        
        // fish[id].important = true; 
        
        original.map(f => {
            if(f.name === name){
                f.caught = true
        }
        });
        
        this.setLocalStorage(original);
        this.setState({fish:original})
      
    }

    clearCaughtHandler = (name) => {
        let original = this.state.fish.slice();
        
        // fish[id].important = true; 
        
        original.map(f => {
            if(f.name === name){
                f.caught = false
        }
        });
        this.setLocalStorage(original);
        this.setState({fish:original})
       
    }

    onImportantHandler = (name) => {
        
        let original = this.state.fish.slice();
        
        // fish[id].important = true; 
        
        original.map(f => {
            if(f.name === name){
                f.important = true
        }
        });
        this.setLocalStorage(original);
        this.setState({fish:original})

   
    }

    clearImportantHandler  = (name) => {
         

         
        let original = this.state.fish.slice();

        original.map(f => {
            if(f.name === name){
                f.important = false
        }
        });
        this.setLocalStorage(original);
        this.setState({fish:original})
       
    }

    clearAllImportant = () => {
        let fish = this.state.fish.slice();
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

    renderUpdatedFish = (arr) => {
        let filteredIMG=[];

       
        const months = Object.keys(this.state.fish[0].Northern);

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

                })}          
        </AnimalItems>
        )
    }

    setCurrentTimeAsFilter = () => {
        let today = new Date();
        let month = today.getMonth();
        let time = today.getHours();

        const months = Object.keys(this.state.fish[0].Northern)
        
        let updateMonths =[];
        updateMonths.push(months[month]);


        this.setState({months:updateMonths, time:time})

    }


    getHemisphere = () => {
        let storage = null;
        let storageLocal = JSON.parse(window.localStorage.getItem('myHemisphere'));


        if(storageLocal === null){
            storage = "Northern"
            this.setState({currentHemisphere:storage,Northern:true})
            
            // console.log("StorageLocal", storage);
        }

        if(storageLocal!==null){
            storage = storageLocal

            if(storage ==="Northern"){
                this.setState({currentHemisphere:storage,Northern:true})
            }else{
                this.setState({currentHemisphere:storage,Northern:false})}
            }
        

    }

    setHemisphere = (myHemisphere) => {
        
        let storageLocal = JSON.parse(window.localStorage.getItem('myHemisphere'));


        localStorage.setItem('myHemisphere', JSON.stringify(myHemisphere));
    }
    getLocalStorage = () => {
        let storage = [];
        let storageLocal = JSON.parse(window.localStorage.getItem('myFish'));
      
        if(storageLocal === null ){
          storageLocal = FISH_INFO.fishapi.slice(); 
          this.setState({fish:storageLocal,loading:false})
        }

        if(storageLocal!== null){
            if(storageLocal !== [] && storage.length === 0){
                for(let i = 0; i< storageLocal.length;i++){
                    storage.push(storageLocal[i]);
                }

               this.setState({fish:storage,loading:false})
            }
        }
    }
    
    setLocalStorage = (list) => {
        localStorage.setItem('myFish', JSON.stringify(list));
    }

    setHemisphereLocalStorage= (Hemisphere) => {
        localStorage.setItem('myFish', JSON.stringify(Hemisphere));
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
                this.state.hideCaught === true || this.state.showImportantOnly === false || this.state.hideCaught === false){
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
         
               
                <M show={this.state.show} clicked={this.closeModal}>
                       {fishInfo}
                </M>

                <Search 
                type="fish"
                clicked={this.switchingHemisphere}
               Northern={this.state.Northern}

                currentTime={this.state.time}
                currentMonth={this.state.months}
                setCurrent={this.setCurrentTimeAsFilter}
               
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


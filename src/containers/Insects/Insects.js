import React,{Component} from 'react';
import AnimalItem from '../../components/AnimalItems/AnimalItem/AnimalItem';
import AnimalItems from '../../components/AnimalItems/AnimalItems';
import Navigation from '../../components/Navigation/Navigation';
import * as INSECTS_INFO from '../../assets/data/BugsInfo';
import M from '../../components/UI/M'
import Search from '../../components/UI/Search'
import Months from '../../components/Months/Months';
import Month from '../../components/Months/Month/Month'
import classes from '../Fish/Fish.module.css';

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
            months:[]
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


        this.setState({
            insects:INSECTS_INFO.bugsapi,
            loading:false,
            images:path
        })
       
    }

    switchHemipshere = (event) => {
        if(event.target.value === "Northern Hemisphere")
        this.setState({currentHemisphere:"Northern", Northern:true})

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
            Northern:true
        })
    }

    render(){
        
        let content = 'loading...';
        let insectInfo = null;
        let months; 

        if(this.state.loading === false){
           
            months = Object.keys(this.state.insects[0].Northern)

            let insects = this.state.insects.slice(); 

            if(this.state.location ||this.state.time ||this.state.months.length > 0 ){

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

            

            let filteredIMG=[];

            content = (
                
                <AnimalItems>
                    {insects.map((i,index) => { 
                        filteredIMG.push(i.id + ".jpg");
                        return (
                        <AnimalItem 
                        key={i.name}
                        name={i.name}
                        price={i.price}
                        clicked={
                            () => {
                            this.showAnimalDetails(insects,filteredIMG,index)}}>
                            <img src={this.images[i.id +".jpg"]} alt={i.name} />
                     
                        </AnimalItem>
                        )
                    })}
                 </AnimalItems>
                 
                )
            
            }else{
                content = (
                    <AnimalItems>
                    {this.state.images.map((img,index) => {
                        return (
                            <AnimalItem 
                            
                            clicked={
                                () => {
                                this.showAnimalDetails(this.state.insects,this.state.images,index)}}
    
                            key={img} name={this.state.insects[index].name}
                            price={this.state.insects[index].price}>
                                <img src={this.images[this.state.images[index]]} alt={img} />
                            </AnimalItem>
                        )
                    })}
                        </AnimalItems>
                )
 
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
                clicked={this.switchHemipshere}
                monthDeleted= {this.onMonthDeleteOption}
                Northern = {this.state.Northern}
                locationSelected={this.locationHandler}
                clearFilters={this.clearFilterHandler}
                timeSelected={this.timeHandler}
                monthSelected={this.monthsHandler}/>

   
                {content}
            </div>
              
            
        )
    
}

}
export default Insects;


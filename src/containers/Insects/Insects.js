import React,{Component} from 'react';
import AnimalItem from '../../components/AnimalItems/AnimalItem/AnimalItem';
import AnimalItems from '../../components/AnimalItems/AnimalItems';
import Navigation from '../../components/Navigation/Navigation';
import * as INSECTS_INFO from '../../assets/data/BugsInfo';
import M from '../../components/UI/M'
import Search from '../../components/UI/Search'

class Insects extends Component{
    constructor(props){
        super(props)
        this.state = {
            insects:[],
            images:[],
            selectedInsect: {}, 
            loading:true,
            show:false,
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


    showAnimalDetails = (arr,imgArr,id) => {
        let info =  {
            image: imgArr[id],
            name:arr[id].name,
            price:arr[id].price,
            time:arr[id].time,
            location:arr[id].location,
            Northern:arr[id].Northern
        }

        this.setState({
            selectedInsect:info,
            show:true
        })

    }

    closeModal =() => {
        this.setState({
        
            show:false})
    }

    render(){
        
        let content = 'loading...';
        let insectInfo = null;

        if(this.state.loading === false){
            console.log(this.state.insects)


  
        
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


        if(this.state.show) {
    
        
            insectInfo = (

                <div>
                
                    <img src={this.images[this.state.selectedInsect.image]} alt={this.state.selectedInsect.name + "Image"}/>
                    <p>Name: {this.state.selectedInsect.name}</p>
                    <p>Price: {this.state.selectedInsect.price}</p>
                    <p>Location: {this.state.selectedInsect.location}</p>
                    <p>Price: {this.state.selectedInsect.name}</p>
                   
                  
                </div>
                

            )
        }


  
   
        return (
            <div>
                
             <Navigation/>
               
                <M show={this.state.show} clicked={this.closeModal}>
                       {insectInfo}
                </M>

                <Search/>
   
                {content}
            </div>
              
            
        )
    
}

}
export default Insects;


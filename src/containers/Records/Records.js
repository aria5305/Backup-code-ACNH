import React, { Component } from 'react';
import classes from './Records.module.css'; 
import * as SONGS_INFO from '../../assets/data/song'; 
import SongItem from '../../components/SongItems/SongItem/SongItem';
import SongItems from '../../components/SongItems/SongItems';



class Records extends Component{
    constructor(props){
        super(props)
        this.state= {
            records: [],
            images:[],
            loading:true       
        }

    }

    importAll = (r) =>  {
        let images = {};
        r.keys().map((item, index) => { images[item.replace('./', '')] = r(item); });
        return images;
      }
      
        images = this.importAll(require.context('../../assets/songs', false, /\.(png|jpe?g|svg)$/));


    componentDidMount(){
        let path = Object.keys(this.images);
        path = path.sort((a, b) => a.length < b.length? -1: 1);

    

        this.setState({
            images:path,
        })
        
        this.getRecords();
    }

    getRecords = () => {
        let storage = [];
        let storageLocal = JSON.parse(window.localStorage.getItem('myRecords'));

        if(storageLocal === null ){
            storageLocal = SONGS_INFO.songs.slice(); 
            this.setState({records:storageLocal,loading:false})
            console.log(storageLocal)
        }

        if(storageLocal!== null){
            if(storageLocal !== [] && storage.length === 0){
                for(let i = 0; i< storageLocal.length;i++){
                    storage.push(storageLocal[i]);
                }
                // console.log(storage,"I am storage");
               this.setState({records:storage,loading:false})
            }
        }
    }

    setLocalStorage = (list) => {
        localStorage.setItem('myRecords', JSON.stringify(list));
    }


    markHandler = (id) => {
        let original = this.state.records.slice();
    
        original.map(f => {
          
            if(f.Order === id){
                if(f.bought){
                    f.bought = false
                }else{
                    f.bought = true
                }
            }
        }); 

        // console.log(original);
        this.setLocalStorage(original);
        this.setState({records:original})
    }


    renderRecords = (arr) => {
        let images = [];
        
        return (
            <SongItems>
                {arr.map((f,index)=>{
                    images.push(f.Order + ".png");
                
                    let className = null;
                   
                    if(f.bought === true){
                        className =classes.recordImages + " " + classes.recordImagesBought
                    }else{
                        className = classes.recordImages;
                    }

                    return (
                        <SongItem key={f.Song}
                        name={f.Song}
                        mood={f.Mood}
                        
                        >
                         <img src={this.images[f.Order+".png"]} className={className} 
                         onClick={() =>this.markHandler(f.Order)}
                         alt={f.Song}/>
                        </SongItem>
                    )

                })}
            </SongItems>
        )
    }
    
    render(){
        let content = "loading..."; 

        if(this.state.loading === false){
          content =  this.renderRecords(this.state.records);
        }
    
        return <div className={classes.Records}>
                {content}
          
                </div>

    }
}

export default Records; 
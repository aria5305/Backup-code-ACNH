import React,{Component} from 'react';
import './App.css';
import {BrowserRouter, Route, Switch} from 'react-router-dom'; 
import FrontPage from './components/UI/FrontPage/FrontPage';
import Fish from './containers/Fish/Fish'
import Insects from './containers/Insects/Insects'
class App extends Component{
  render(){
    return (
    <BrowserRouter>
      <div className="App">
     
        <Switch> 
            <Route path='/fish'component={Fish}/>
            <Route path='/insects'component={Insects}/>
            <Route path='/' exact component={FrontPage} /> 
        </Switch>
      </div>
    </BrowserRouter>
  );
}
}

export default App;
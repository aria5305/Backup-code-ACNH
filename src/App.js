import React,{Component} from 'react';
import './App.css';
import {BrowserRouter, Route, Switch} from 'react-router-dom'; 
import Hero from './components/UI/Hero/Hero';
import Fish from './containers/Fish/Fish'
import Insects from './containers/Insects/Insects'
import Layout from './components/Layout/Layout'
class App extends Component{
  render(){
    return (
    <BrowserRouter>
      <div>
      <Layout>
        <Switch> 
            <Route path='/fish'component={Fish}/>
            <Route path='/insects'component={Insects}/>
            <Route path='/' exact component={Hero} /> 
          </Switch>
        </Layout>
      </div>
    </BrowserRouter>
  );
}
}

export default App;
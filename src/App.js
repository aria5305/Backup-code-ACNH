import React,{Component} from 'react';
import './App.css';
import {HashRouter, Route, Switch} from 'react-router-dom'; 
import Hero from './components/UI/Hero/Hero';
import Fish from './containers/Fish/Fish'
import Insects from './containers/Insects/Insects';
import Records from './containers/Records/Records';
import Layout from './components/Layout/Layout';
class App extends Component{
  render(){
    return (
    <HashRouter>
      {/* <div> */}
      <Layout>
        <Switch> 
            <Route path='/records'component={Records}/>
            <Route path='/fish'component={Fish}/>
            <Route path='/insects'component={Insects}/>
            <Route path='/' exact component={Hero} /> 
          </Switch>
        </Layout>
      {/* </div> */}
    </HashRouter>
  );
}
}

export default App;
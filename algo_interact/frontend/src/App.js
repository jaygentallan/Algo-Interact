import React, {Component} from 'react';
import './App.css';
import Main from './Components/Main/Main'
import Header from './Components/Header/Header'
import Sidebar from './Components/Sidebar/Sidebar'
import Footer from './Components/Footer/Footer'

class App extends Component {
  render() {
    return(
      <div className='Container'>
        <Header/>
        <Main/>
        <div className='Side1'>
          <Sidebar/>
        </div>
        <div className='Side2'>
          <Sidebar/>
        </div>
        <Footer/>
      </div>
    )
  }
}


export default App;

import React, { Component } from 'react';

import { Button } from 'reactstrap';

import NavBar from '../components/Navbar'

class App extends Component {
  render() {
    return (
      <div className="App">
        <NavBar/>
        <Button>Test</Button>
      </div>
    );
  }
}

export default App;

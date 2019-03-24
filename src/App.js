import React, {Component} from 'react';
import List from './components/Notes';

class App extends Component {
  render() {
      return (
          <div className="container my-5">
              <header>
              <h1>Private List <sup>beta</sup></h1>
          </header>
              <List></List>
        </div>
      );
  }
}

export default App;

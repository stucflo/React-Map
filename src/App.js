import React, { Component } from 'react';
import './App.css';
import locations from './locations.json';
import MapDisplay from './components/MapDisplay';
import ListDrawer from './components/ListDrawer';
import NoMapDisplay from './components/NoMapDisplay';

import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'

library.add(faBars)

class App extends Component {
  state = {
    lat: 42.296778,
    lon: -88.999617,
    zoom: 13,
    all: locations,
    filtered: null,
    open: false
  }

  styles = {
    menuButton: {
      marginLeft: 10,
      marginRight: 20,
      position: "absolute",
      left: 10,
      top: 20,
      background: "white",
      padding: 10
    },
    hide: {
      display: 'none'
    },
    header: {
      marginTop: "0px"
    }
  };

  componentDidMount = () => {
    this.setState({
      ...this.state,
      filtered: this.filterLocations(this.state.all, "")
    });
  }

  toggleDrawer = () => {
    // Open or close drawer
    this.setState({
      open: !this.state.open
    });
  }

  updateQuery = (query) => {
    // Update query and filter
    this.setState({
      ...this.state,
      selectedIndex: null,
      filtered: this.filterLocations(this.state.all, query)
    });
  }

  filterLocations = (locations, query) => {
    // Filter locations 
    return locations.filter(location => location.name.toLowerCase().includes(query.toLowerCase()));
  }

  clickListItem = (index) => {
    // Set state to reflect selected location in array index
    this.setState({ selectedIndex: index, open: !this.state.open })
  }


  render = () => {
    return (
      <div className="App">
        <div>
        <button onClick={this.toggleDrawer} style={this.styles.menuButton}>
        <FontAwesomeIcon icon="bars" />
        </button>
          <h1>My Favorite Restaurants</h1>
        </div>
        <MapDisplay
        lat={this.state.lat}
        lon={this.state.lon}
        zoom={this.state.zoom}
        locations={this.state.filtered}
        clickListItem={this.clickListItem}  
        />
        <ListDrawer
          locations={this.state.filtered}
          open={this.state.open}
          toggleDrawer={this.toggleDrawer}
          filterLocations={this.updateQuery}
          clickListItem={this.clickListItem}  
          />
      </div>
    );
  }
}

export default App;

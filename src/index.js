import $ from 'jquery';
import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import moment from 'moment';
import axios from 'axios';
import ReactDOM from 'react-dom';
import Layout from './components/Layout';
import Checkin from './components/Checkin';
import Checkout from './components/Checkout';
import SearchRoute from './components/SearchRoute';
import UnplannedTable from './components/UnplannedTable';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import io from 'socket.io-client';

const app = document.createElement('div');
app.id = 'app';
document.body.appendChild(app);

const socket = io('http://amazon-yard.herokuapp.com')

function driverListener(cb){
  socket.on('checkupdated', (data) => cb(null, data))
}

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      drivers: [],
      routes: [],
        blocks: {},
        today: moment().format('MM-DD-YYYY'),
        items: [],
    }
    driverListener((err, data) => {
      const drivers = this.state.drivers;
      console.log('hi')
      for(let i = 0; i < drivers.length; i++){
        if(drivers[i]._id == data._id){
          drivers[i] = data;
          const newArray = drivers;

          this.setState({ drivers: newArray})
        }
      }
    })
    this.driverListener = this.driverListener.bind(this)
    this.filterDriverList = this.filterDriverList.bind(this);
    this.filterRouteList = this.filterRouteList.bind(this);
  }
  //refactor....
  filterDriverList(event){
    let updatedList = this.state.drivers;
    updatedList = updatedList.filter(function(driver){
      return driver.name.toLowerCase().search(
        event.target.value.toLowerCase()) !== -1;
    });
    this.setState({items: updatedList});
  }

  filterRouteList(event){
    let updatedList = this.state.routes;
    updatedList = updatedList.filter(function(route){
      return route.name.toLowerCase().search(
        event.target.value.toLowerCase()) !== -1;
    });
    this.setState({items: updatedList});
  }

  componentWillMount(){
    axios.get('http://localhost:3000/api/drivers/' + this.state.today)
      .then( res => {
        this.setState({ drivers: res.data })
        console.log(this.state.drivers)
        let object = {}

        res.data.map( driver => {

          let checkin = 0;
          let noShow = 0;
          const block = driver.block;
          const shiftLength = driver.shiftLength;

          if(driver.checkin){
            checkin = 1;
          } else {
            noShow = 1;
          }

          if(object[block] === undefined){
            object[block] = {
              name: block,
              total: 1,
              shiftLength: shiftLength,
              checkIn: checkin,
              noShow: noShow
            }
          } else {
            object[block]['total']++
            object[block]['checkIn'] += checkin
            object[block]['noShow'] += noShow
          }
        })
        this.setState({ blocks: object })
      })
      .catch( err => {
        return err
      })

    axios.get('http://localhost:3000/api/routes/' + this.state.today)
      .then( res => {
        this.setState({ routes: res.data })
        console.log(this.state.routes)
      })
      .catch( err => {
        return err
      })

  }

  render(){
    return(
      <Router>
        <div>
          <nav>
            <Link to="/dashboard">Dashboard</Link>
            <Link to="/checkin">Check In</Link>
            <Link to="/checkout">Check Out</Link>
            <Link to="/searchRoute">Search Route</Link>
            <Link to="/unplannedTable">Unplanned Route</Link>
          </nav>
          <div>
            <Route exact path="/dashboards" render={(props) => (<Layout items={this.state.items} filterList={this.filterDriverList} drivers={this.state.drivers} />)} />
            <Route path="/checkin" render={(props) => (<Checkin items={this.state.items} filterList={this.filterDriverList} drivers={this.state.drivers} />)} />
            <Route path="/checkout"  render={(props) => (<Checkout  routes={this.state.routes} items={this.state.items} filterList={this.filterRouteList} />)} />
            <Route path="/searchRoute" component={SearchRoute} />
            <Route path="/unplannedTable" render={(props) => (<UnplannedTable blocks={this.state.blocks} />)} />
          </div>
        </div>
      </Router>
    )
  }
}

ReactDOM.render(
    <App />
, app);

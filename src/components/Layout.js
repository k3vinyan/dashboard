import React from 'react';
import Checkin from './Checkin';
//import UnplannedTable from './UnplannedTable';

export default class Layout extends React.Component {
  constructor(props){
    super(props);
  }

  render(){
    return(
      <div>
        <Checkin items={this.props.items} drivers={this.props.drivers} filterList={this.props.filterList}/>
      </div>
    )
  }
}

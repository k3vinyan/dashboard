import React from 'react';
import DriverRow from './DriverRow';

export default class Checkin extends React.Component {
  constructor(props){
    super(props);
  }

  handleClick(){
    console.log('hi')
  }

  render(){
    return(
      <div>
        <div className="filter-list">
          <form>
            <fieldset className="form-group">
              <input type="text" className="form-control form-control-lg" placeholder="Search" onChange={this.props.filterList}/>
            </fieldset>
          </form>
        </div>
        <table className='table table-hover' id='flexTable' >
          <thead>
            <tr>
              <th className='font-weight-bold'>Name</th>
              <th className='text-center font-weight-bold'>ID</th>
              <th className='text-center font-weight-bold'>Shift Length</th>
              <th className='text-center font-weight-bold'>Start Time</th>
              <th className='text-center font-weight-bold'>End Time</th>
              <th className='text-center font-weight-bold'>Check In</th>
            </tr>
          </thead>
          <DriverRow drivers={this.props.items} />
        </table>
      </div>
    )
  }
}

import React from 'react';
import RouteRow from './RouteRow';

export default class Checkout extends React.Component {
  constructor(props){
    super(props)
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
        <table className='table table-hover' id='routeTable'>
          <thead>
            <tr>
              <th className='text-center'>Route</th>
              <th className='text-center'>Type</th>
              <th className='text-center'>Others</th>
              <th className='text-center'>Out for Delivery</th>
              <th className='text-center'>Between Stations</th>
              <th className='text-center'>At Station</th>
              <th className='text-center'>Total</th>
              <th className='text-center'>Check Out</th>
            </tr>
          </thead>
          <RouteRow routes={this.props.items} />
      </table>
    </div>
    )
  }
}

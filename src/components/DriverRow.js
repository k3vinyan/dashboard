import React from 'react';

export default class DriverRow extends React.Component {
  constructor(props){
    super(props)
  }

  render(){
    return(
      <tbody>
        {
          this.props.drivers.map( (driver, i ) =>
            <tr className='range-click' id={driver._id} key={driver._id}>
              <td>{driver.name}</td>
              <td className='text-center'>{driver.driverId}</td>
              <td className='text-center'>{driver.shiftLength}</td>
              <td className='text-center'>{driver.startTime}</td>
              <td className='text-center'>{driver.endTime}</td>
              <td className='text-center'>
                { driver.checkin ?
                  <input type='checkbox' className='checkbox' value={driver.driverId} defaultChecked/>
                  :
                  <input type='checkbox' className='checkbox' value={driver.driverId} />
                }
              </td>
            </tr>
          )
        }
      </tbody>
    )
  }
}

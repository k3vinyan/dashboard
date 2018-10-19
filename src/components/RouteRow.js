import React from 'react';

export default class RouteRow extends React.Component {
  constructor(props){
    super(props)
  }

  render(){
    return(
      <tbody>
      {
        this.props.routes.map( (route, i ) =>
          <tr key={route._id}>
            <td className='text-center'>{route.name}</td>
            <td className='text-center'>{route.type}</td>
            <td className='text-center'>{route.others}</td>
            <td className='text-center'>{route.outForDelivery}</td>
            <td className='text-center'>{route.betweenStation}</td>
            <td className='text-center'>{route.atStation}</td>
            <td className='text-center'>{route.totalPackage}</td>
            {
              route.type === 'FLEX' ?
              <td className='text-center'><input type='checkbox' className='checkbox' value=" + route + " /></td>
              :
              <td className='text-center'><input type='checkbox' className='checkbox' value=" + route + " defaultChecked/></td>
            }
          </tr>
        )
      }
    </tbody>
    )
  }
}

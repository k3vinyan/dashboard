import React from 'react';

export default class UnplannedTable extends React.Component {
  constructor(props){
    super(props)
  }

  render(){
    const blocks = this.props.blocks;
    return(
      <table className='table' id='counterTable'>
        <thead>
          <tr>
            <th className='text-center'>Block</th>
            <th className='text-center'>Shift Length</th>
            <th className='text-center'>Total(Accepted)</th>
            <th className='text-center'>Checkin(Actual)</th>
            <th className='text-center'>No Show</th>
          </tr>
        </thead>
        <tbody>
          {
            Object.keys(blocks).map(block =>
              <tr id={block} key={block}>
                <td className='text-center'>{block}</td>
                <td className='text-center'>{blocks[block].shiftLength}</td>
                <td className='text-center'>{blocks[block].total}</td>
                <td className='text-center'>{blocks[block].checkIn}</td>
                <td className='text-center'>{blocks[block].noShow}</td>
              </tr>
            )
          }
        </tbody>
      </table>
    )
  }
}

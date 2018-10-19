import io from 'socket.io-client';
const socket = io('http://amazon-yard.herokuapp.com')

function driverListener(){
  socket.on('checkupdated', (data) => {
    console.log('hi')
    console.log(data)
  })
}

module.exports = driverListener;

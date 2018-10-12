import io from 'socket.io-client';
import $ from 'jquery';
import 'bootstrap/dist/css/bootstrap.min.css';

$( document ).ready(function(){
  const socket = io();
    socket.on('block', data => {
      $('body').html(data)
      return false;
    })
})

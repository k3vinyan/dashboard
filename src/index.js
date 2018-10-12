import io from 'socket.io-client';
import $ from 'jquery';

$( document ).ready(function(){
  const socket = io();
    socket.on('block', data => {
      $('body').html(data)
      return false;
    })
})

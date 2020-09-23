const http = require('http');
const express = require('express');
const port = 3000;
const app = require('./app');

const server = http.createServer(app);

server.listen(port , function(){
    console.log('server is starting at port ' + port);
})
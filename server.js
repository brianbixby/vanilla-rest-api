'use strict';

const http =require('http');
// creating http servers and dealing with http req's; gives us access to req and res object and create server
const PORT = process.env.PORT || 3000;
//  port actually runs server

const server = http.createServer(router.routes());
// callback function param will be passed in from router files

server.listen(PORT, () => {
  console.log(`server up: ${PORT}`);
});





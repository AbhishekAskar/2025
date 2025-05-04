const http = require('http');
const routes = require('./routes');

routes.anotherFunction();
const server = http.createServer(routes);

server.listen(3000, () => {
  console.log("Server is Running at http://localhost:3000");
});

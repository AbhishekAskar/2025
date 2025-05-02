const http = require('http');
const fs = require('fs')

const server = http.createServer((req, res) => {

  const url = req.url;
  const method = req.method;
  if (req.url === '/') {
    res.setHeader('Content-Type', 'text/html');
    res.end(
      `
        <form action="/message" method="POST">
          <label>Name:</label>
          <input type="text" name="username"></input>
          <button type="submit">Add</button>
        </form> 
      `
    );
  } else {
    if (req.url == '/message') {

      res.setHeader('Content-type', 'text/html');

      let body = [];
      req.on('data', (chunks) => {
        // console.log(chunks);
        // console.log(chunks.toString());
        // dataChunks.push(chunks);
        // console.log(dataChunks);
        body.push(chunks);
      })

      req.on('end', ()=>{
        // let combinedBuffer = Buffer.concat(dataChunks);
        // console.log(combinedBuffer.toString());
        // let value= combinedBuffer.toString().split("=");
        // console.log(value);
        let buffer = Buffer.concat(body);
        console.log(buffer);
        let formData = buffer.toString();
        console.log(formData);

        const formValues = formData.split('=')[1];
        fs.writeFile('formValues.txt', formValues, (err) =>{
          res.statusCode = 302; //redirected
          res.setHeader('Location', '/');
          res.end();
        });
      })
    }else{
      if(req.url == '/read'){
        //read from the file
        fs.readFile('formValues.txt', (err, data)=>{
          console.log(data.toString());
          res.end(`
              <h1>${data.toString()}</h1>
            `);
        });

      }
    }
  }

});

let port = 3000;
server.listen(port, () => {
  console.log("Server is Running at http://localhost:" + port);
});

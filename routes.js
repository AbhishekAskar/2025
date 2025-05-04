const fs = require('fs');

const requestHandler = (req, res) =>{
  const url = req.url;
  const method = req.method;

  if (url === '/') {
    fs.readFile('formValues.txt', (err, fileData) => {
      let savedData = fileData ? fileData.toString() : '';
      res.setHeader('Content-Type', 'text/html');
      res.end(`
        <h1>${savedData ? savedData : ''}</h1>
        <form action="/message" method="POST">
          <label>Name:</label>
          <input type="text" name="username">
          <button type="submit">Add</button>
        </form> 
      `);
    });
  } else if (url === '/message' && method === 'POST') {
    let body = [];
    req.on('data', (chunk) => {
      body.push(chunk);
    });

    req.on('end', () => {
      let buffer = Buffer.concat(body);
      let formData = buffer.toString();
      let formValue = formData.split('=')[1];
      fs.writeFile('formValues.txt', formValue, (err) => {
        res.statusCode = 302;
        res.setHeader('Location', '/');
        res.end();
      });
    });
  }
}

const anotherFunction = () => {
    console.log('This is another function');
}

module.exports = {
    requestHandler,
    anotherFunction
}
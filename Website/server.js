const http = require("http");
const fs = require('fs').promises;

const host = 'localhost';
const port = 8000;
let indexFile;

console.log("Starting the server...");

const requestListener = function (req, res) {
    console.log("Received a request");
    res.setHeader("Content-Type", "text/html");
    res.writeHead(200);
    res.end(indexFile);
};

const server = http.createServer(requestListener);

fs.readFile(__dirname + "/index.html")
.then(contents => {
    indexFile = contents;
    server.listen(port, host, () => {
        console.log(`Server is running on http://${host}:${port}`);
    });
})
.catch(err => {
    console.error(`Could not read index.html file: ${err}`);
    process.exit(1);
});
const http = require("http");
const host = 'localhost';
const port = 8000;

console.log("Starting the server...");

const requestListener = function(req, res){
    console.log("Received a request");
    res.writeHead(200);
    res.end("Hello World");
};

const server = http.createServer(requestListener);

server.on('error', (err) => {
    console.error('Server error:', err);
});

console.log("Attempting to listen on port", port);

server.listen(port, host, (err) => {
    if (err) {
        console.error("Error starting the server:", err);
        return;
    }
    console.log(`Server is running on http://${host}:${port}`);
});

console.log("Server setup complete, waiting for requests...");
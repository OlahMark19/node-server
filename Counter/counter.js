const http = require('http');
const fs = require('fs').promises;
const path = require('path');

const host = 'localhost';
const port = 8000;

let indexFile;
const counterFilePath = path.join(__dirname, 'counter.txt');
let requestCount = 0;


fs.readFile(counterFilePath)
    .then(contents => {
        requestCount = parseInt(contents, 10) || 0;
    })
    .catch(err => {
        if (err.code !== 'ENOENT') {
            console.error(`Could not read counter.txt file: ${err}`);
            process.exit(1);
        }
    });

console.log("Starting the server...");

const requestListener = function (req, res) {
    console.log("Received a request");

    if (req.method === 'GET') {
        if (req.url === '/') {
            // Serve the index.html file
            res.setHeader("Content-Type", "text/html");
            res.writeHead(200);
            res.end(indexFile);
        } else if (req.url === '/script.js') {
            // Serve the script.js file
            fs.readFile(path.join(__dirname, 'script.js'))
                .then(contents => {
                    res.setHeader("Content-Type", "application/javascript");
                    res.writeHead(200);
                    res.end(contents);
                })
                .catch(err => {
                    res.writeHead(500);
                    res.end('Internal Server Error');
                    console.error(`Could not read script.js file: ${err}`);
                });
        } else if (req.url === '/counter') {
            // Serve the counter data
            requestCount++;
            fs.writeFile(counterFilePath, requestCount.toString())
                .then(() => {
                    res.setHeader("Content-Type", "application/json");
                    res.writeHead(200);
                    res.end(JSON.stringify({ count: requestCount }));
                })
                .catch(err => {
                    res.writeHead(500);
                    res.end('Internal Server Error');
                    console.error(`Could not write to counter.txt file: ${err}`);
                });
        } else {
            res.writeHead(404);
            res.end('Not Found');
        }
    } else {
        res.writeHead(405);
        res.end('Method Not Allowed');
    }
};

const server = http.createServer(requestListener);

fs.readFile(path.join(__dirname, "index.html"))
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

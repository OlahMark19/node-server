const http = require("http");

// Browser ---request------> [server(minimal.js)]
http.createServer(function(req, res){
    console.log("Received a request");
    // [server(minimal.js)] -------response---> browser
    res.writeHead(200);
    res.write("Hello")
    res.write(" World")
    setTimeout(function () {
        res.end()
    }, 2000)
  //  res.end();
}).listen(8080);
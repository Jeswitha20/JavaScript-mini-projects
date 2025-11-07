const http = require("http");
const fs = require("fs");
const path = require("path");

// Creating the server
const server = http.createServer((req, res) => {
  const url = new URL(req.url, `http://${req.headers.host}`);

  if (url.pathname === "/") {
    // Serving index.html when user opens the browser
    const filePath = path.join(__dirname, "index.html");
    fs.readFile(filePath, (err, data) => {
      if (err) {
        res.writeHead(500, { "Content-Type": "text/plain" });
        res.end("Error loading page");
      } else {
        res.writeHead(200, { "Content-Type": "text/html" });
        res.end(data);
      }
    });
  } 
  else if (url.pathname === "/greet") {
    // Handling greeting request
    const name = url.searchParams.get("name") || "Guest";
    res.writeHead(200, {
      "Content-Type": "text/plain",
      "Access-Control-Allow-Origin": "*",
    });
    res.end(`Hello ${name}, this message came from the Node.js server!`);
  }
   else {
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("Not Found");
  }
});

server.listen(3000, () => {
  console.log("Node.js server running at http://localhost:3000");
});

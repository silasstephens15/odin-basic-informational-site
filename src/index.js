const http = require("node:http");
const fs = require("fs");

function getFileData(url) {
  const file = "./src/pages/" + (url = "/" ? "/index" : url).slice(1) + ".html";
  try {
    var data = fs.readFileSync(file, "utf8");
  } catch (err) {
    console.log(err);
    console.log(url);
  }
  return data;
}

const server = http.createServer((req, res) => {
  res.writeHead(200, { "Content-Type": "text/html" });
  res.end(getFileData(req.url));
});

server.listen(8080);

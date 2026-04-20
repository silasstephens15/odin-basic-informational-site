const http = require("node:http");
const fs = require("fs");

function getFileData(url) {
  const file =
    "./src/pages/" + (url == "/" ? "/index" : url).slice(1) + ".html";
  try {
    var data = fs.readFileSync(file, "utf8");
  } catch (err) {
    console.log(err);
    if (err.code == "ENOENT") {
      throw new Error("File not found.");
    }
  }
  return data;
}

const server = http.createServer((req, res) => {
  try {
    var data = getFileData(req.url);
    res.writeHead(200, { "Content-Type": "text/html" });
  } catch (err) {
    res.writeHead(404, { "Content-Type": "text/html" });
    console.log(err);
    if ((err = "File not found.")) {
      var data = getFileData("/404");
    }
  }
  res.end(data);
});

server.listen(8080);

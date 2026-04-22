const express = require("express");
const fs = require("fs");
const app = express();

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

app.get("/", (req, res) => res.send(getFileData("/")));
app.get("/about", (req, res) => res.send(getFileData("/about")));
app.get("/contact-me", (req, res) => res.send(getFileData("/contact-me")));
app.use((req, res) => res.status(404).send(getFileData("/404")));

const PORT = 3000;
app.listen(PORT, (error) => {
  if (error) {
    throw error;
  }
  console.log(`listening on port ${PORT}`);
});

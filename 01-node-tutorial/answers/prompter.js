const http = require("http");
const StringDecoder = require("string_decoder").StringDecoder;

const getBody = (req, callback) => {
  const decode = new StringDecoder("utf-8");
  let body = "";
  req.on("data", function (data) {
    body += decode.write(data);
  });
  req.on("end", function () {
    body += decode.end();
    const body1 = decodeURI(body);
    const bodyArray = body1.split("&");
    const resultHash = {};
    bodyArray.forEach((part) => {
      const partArray = part.split("=");
      resultHash[partArray[0]] = decodeURIComponent(partArray[1]);
    });
    callback(resultHash);
  });
};

let item = "I'd love to know!";
let items = [];

const form = () => {
  return `
  <head>
    <style>
      body {background: orange; font-family: Arial, sans-serif; margin: 20px; display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100vh; }
      p { font-size: 20px; font-weight: bold; text-align: center; }
      form { margin-top: 20px; display: flex; justify-content: center; }
      button { margin-right: 10px; padding: 10px 20px; font-size: 16px; cursor: pointer; }
      ul { margin-top: 20px; list-style-type: none; padding: 0; }
      li { margin-bottom: 10px; padding: 10px; border-radius: 5px; text-align: center; }
    </style>
  </head>
  <body>
    <h1>How was your day?</h1>
    <p>${item}</p>
    <form method="POST">
      <button type="submit" name="item" value="${encodeURIComponent('Awesome!')}">Great!</button>
      <button type="submit" name="item" value="${encodeURIComponent("I'll take it!")}">Okay..</button>
      <button type="submit" name="item" value="${encodeURIComponent("Oh, I'm sorry.")}">Bad.</button>
    </form>
    <ul>
      ${items.map(i => `<li>${i}</li>`).join('')}
    </ul>
  </body>
  `;
};

const server = http.createServer((req, res) => {
  if (req.method === "POST") {
    getBody(req, (body) => {
      if (body["item"]) {
        item = body["item"];
      } else {
        item = "Nothing was entered.";
      }
      res.writeHead(303, { Location: "/" });
      res.end();
    });
  } else {
    res.writeHead(200, { "Content-Type": "text/html" });
    res.end(form());
  }
});



server.listen(3000, () => {
  console.log("The server is listening on port 3000.");
});
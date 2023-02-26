const http = require("http");
require("dotenv").config();
const app = require("./app");
const server = http.createServer(app);

const PORT = process.env.PORT || 8000;
server.listen(PORT, () => {
  console.log(`Listening on port ${PORT}...`);
});

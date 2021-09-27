require("dotenv").config({ path: ".env" });
const app = require("./app");
require("./mongoose");

const port = process.env.PORT || 5001;

app.listen(port, () => console.log("Server on Port " + port));

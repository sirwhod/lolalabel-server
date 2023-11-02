"use strict";

var _app = require("./app");
const PORT = 5569;
_app.app.listen(PORT, () => {
  console.log(`🚀 Server is running on Port: ${PORT}`);
});
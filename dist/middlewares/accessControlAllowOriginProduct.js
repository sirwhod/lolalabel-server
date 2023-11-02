"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
const accessControlAllowOriginMiddlewareProduct = async (req, res, next) => {
  const allowedOrigin = 'http://label.lolafromrio.com.br';
  const url = req.headers.origin;
  if (url === `${allowedOrigin}:3000`) {
    res.header('Access-Control-Allow-Origin', 'http://label.lolafromrio.com.br:3000');
  } else if (url === 'http://localhost:5173') {
    res.header('Access-Control-Allow-Origin', 'http://localhost:5173');
  } else {
    res.header('Access-Control-Allow-Origin', 'http://label.lolafromrio.com.br');
  }
  res.header('Access-Control-Allow-Methods', 'GET, OPTIONS, PATCH, DELETE, POST, PUT');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  if (req.method === 'OPTIONS') {
    // Respond directly to OPTIONS requests
    return res.status(200).end();
  }
  next();
};
var _default = accessControlAllowOriginMiddlewareProduct;
exports.default = _default;
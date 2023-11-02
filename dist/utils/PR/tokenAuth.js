"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.tokenDecoder = tokenDecoder;
exports.tokenGenerator = tokenGenerator;
var _jsonwebtoken = require("jsonwebtoken");
const HASH_JSONWEBTOKEN = 'estaehahashdecriptografiadoappplataformaderotulosdalolacosmetics';
function tokenGenerator(id) {
  const token = (0, _jsonwebtoken.sign)({
    id
  }, HASH_JSONWEBTOKEN, {
    expiresIn: '30d'
  });
  return token;
}
function tokenDecoder(authorization) {
  try {
    const decoded = (0, _jsonwebtoken.verify)(authorization, HASH_JSONWEBTOKEN);
    const {
      id
    } = decoded;
    return id;
  } catch (e) {
    return e;
  }
}
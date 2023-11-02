"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getDateBrazil = getDateBrazil;
function getDateBrazil() {
  const date = new Date();

  // Ajuste o objeto Date para o fuso horário do Brasil (UTC-3:00)
  date.setUTCHours(date.getUTCHours());
  const dateString = date.toISOString();
  // Exemplo de como exibir a data e hora no formato ISO 8601
  return dateString;
}
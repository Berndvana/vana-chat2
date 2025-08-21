// api/faq.js — serves JSON FAQ
const data = require('./faqData.json');

module.exports = function handler(req, res) {
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.status(200).json(data);
};

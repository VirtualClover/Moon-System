const createComment = require('../utils/createComment.js');
const dislcaimer = [
  'This file was created by Bitso\n\n',
  'DO NOT edit directly',
  `Last Generated: ${new Date()}\n\n`,
];
exports.DISCLAIMER = {

  js: createComment(dislcaimer, 'js'),
};

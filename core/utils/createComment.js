/**
 * Creates a comment given a platform
 * It takes an array, each array is a line
 * @param {*} comment The contetn of the comment
 * @param {*} fileExtension The extension fo the file
 * @param {*} noBreakLine If true a break line is NOT added at the end of the comment
 * @returns A string with the parsed comment
 */
function createComment(
  comment,
  fileExtension,
  noBreakLine
) {
  const extensions = {
    js: {
      prefix: '//',
      sufix: '',
    },
  };

  let res = [];
  for (let i = 0; i < comment.length; i++) {
    let format = extensions[fileExtension];
    let line = `${format.prefix} ${comment[i]} ${format.sufix} ${noBreakLine ? '' : '\n'}`;
    res = res + line;
  }
  return res
};


module.exports = createComment;
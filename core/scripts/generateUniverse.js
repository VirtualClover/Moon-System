var fs = require('fs');
const https = require('https')
var TOKENS = require('../tokens/universe/universe.json');
var ENV = require('../../env/env.json');
var CONSTANTS = require('./CONSTANTS.js');
const createComment = require('../utils/createComment.js');
async function generateUniverse() {
  console.log('Generating universe JS file...');
  const url = ('https://galileo-api-bqjgycnf5q-uc.a.run.app/colors');
  let universe = '';
  await https.get(url, res => {
    res.on('data', chunk => {
      universe += chunk;
    });
    res.on('end', () => {
      universe = JSON.parse(universe);
      //console.log(universe);
      writeToJS(universe.data.colors);
    })
  }).on('error', err => {
    console.log(err.message);
  });

}


async function writeToJS(data) {
  const types = {
    color: ['interface UniverseColor {', '\t0?: string', '\t10: string', '\t20: string', '\t30: string', '\t40: string', '\t50: string', '\t60: string', '\t70: string', '\t80: string', '\t90: string', '\t100: string', '}']
  };
  const path = 'packages/js/universe/';
  let colors = [CONSTANTS.DISCLAIMER.js, '// Universe', '//Figma file: https://www.figma.com/file/XU1kwGVYTHQ21HJiYpYSDQ/Moon-Foundation?node-id=129%3A2873'];
  let typing = [CONSTANTS.DISCLAIMER.js, '//Universe Typing', ...types.color];
  for (const color in data) {
    let parent = data[color];
    let shades = [];
    for (const shade in parent) {
      let shadeObj = parent[shade];
      let shadeVar = `\t${shade}:'${shadeObj.hex}', ${shadeObj.comment ? createComment([shadeObj.comment], 'js', true) : ''
        }`;
      await shades.push(shadeVar);
    }
    let colorVar = `export const ${color} = {\n${shades.join('\n')}\n};`;
    let colorType = `export const ${color} : UniverseColor;`;
    colors.push(colorVar);
    typing.push(colorType);
  }
  await fs.mkdir(path, { recursive: true }, (err) => {
    if (err) throw err;
  });
  await fs.writeFile(`${path}universe.js`, colors.join('\n'), function (err) {
    if (err) {
      return console.error(err);
    }


    console.log('\x1b[32m', 'JS Data written successfully!');
  });
  await fs.writeFile(`${path}universe.d.ts`, typing.join('\n'), function (err) {
    if (err) {
      return console.error(err);
    }
    console.log('\x1b[32m', 'Delcarative TS written successfully!');
  });
  createMDDoc(data);
};

async function createMDDoc(data) {
  let doc = [`This is Bitso's general color palette.`, `Last generated:  ${new Date()}`];
  let tableHead = `|| ||*Shade*||*Hex*||*RGB*||*HSL*||*Description*||`;
  for (const color in data) {
    let parent = data[color];
    let shades = [];
    for (const shade in parent) {
      let shadeObj = parent[shade];
      let shadeVar = `|{color:${shadeObj.hex}}■{color} | ${shade} | ${shadeObj.hex} | ${shadeObj.rgb} | ${shadeObj.hsl} | ${shadeObj.description ? shadeObj.description : ' '}|`;
      await shades.push(shadeVar);
    }
    let table = [`h2.${color}  `, tableHead, ...shades];
    await doc.push(table.join('\n'));
  }
  let parsedDoc = await doc.join('\n');
  // console.log(doc.join('\n'));
  let requestOptions = {
    method: 'PUT',
    hostname: ENV.WIKI_HOSTNANE,
    path: ENV.WIKI_PATH,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': ENV.TOKEN,
    },
  };
  let requestBody = {
    type: "page",
    title: "Universe",
    space: { key: "~423496812" },
    body: {
      storage: {
        value: parsedDoc,
        representation: "wiki"
      }
    },
    version: { number: 0 }
  };
  await https.get({ hostname: requestOptions.hostname, path: requestOptions.path, headers: requestOptions.headers }, res => {
    let docData = '';
    res.on('data', chunk => {
      docData += chunk;
    });
    res.on('end', () => {
      docData = JSON.parse(docData);
      // console.log(docData.version.number);
      requestBody.version.number = docData.version.number+1;
      const req = https.request(requestOptions, res => {
        res.on('data', chunk => {
          process.stdout.write(chunk)
        });
        res.on('end', () => {
          console.log('Doc updated succesfully!');
        })
      }).on('error', err => {
        console.log(err.message);
      });
      // console.log(requestBody);
      req.write(JSON.stringify(requestBody));
      req.end();
    })
  }).on('error', err => {
    console.log(err.message);
  });
};

generateUniverse();

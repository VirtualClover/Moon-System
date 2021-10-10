var fs = require('fs');
const https = require('https')
var ENV = require('../../env/env.json');
var CONSTANTS = require('../utils/CONSTANTS.js');
const createComment = require('../utils/createComment.js');
async function generateUniverse() {
  let universe = '';
  await https.get(ENV.URLS.GALILEO.COLORS, res => {
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
  console.log('\x1b[37m', 'Generating universe JS/TS file...');
  const types = {
    color: ['interface UniverseColor {', '\treadonly 0?: string', '\treadonly 10: string', '\treadonly 20: string', '\treadonly 30: string', '\treadonly 40: string', '\treadonly 50: string', '\treadonly 60: string', '\treadonly 70: string', '\treadonly 80: string', '\treadonly 90: string', '\treadonly 100: string', '}']
  };
  const path = 'packages/js/universe/';
  let colors = [CONSTANTS.DISCLAIMER.js, '// Universe', `// Figma: ${ENV.URLS.FIGMA.FOUNDATIONS}`, createComment([`Documentation: https://${ENV.WIKI.HOSTNAME}/wiki/spaces/${ENV.WIKI.SPACE}/pages/${ENV.WIKI.PAGE_IDS.UNIVERSE}`], 'js')];
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
    let colorVar = `export const ${color} = Object.freeze({\n${shades.join('\n')}\n});`;
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
  });
  let indexContent = `${CONSTANTS.DISCLAIMER.js}export * as universe from './universe';`;
  await fs.writeFile(`${path}index.js`, indexContent, function (err) {
    if (err) {
      return console.error(err);
    }
  });
  await fs.writeFile(`${path}index.d.ts`, indexContent, function (err) {
    if (err) {
      return console.error(err);
    }
  });
  await fs.writeFile(`${path}universe.d.ts`, typing.join('\n'), function (err) {
    if (err) {
      return console.error(err);
    }
  });
  await fs.copyFile(`core/utils/tests/universe.test.js`, `${path}universe.test.js`, function (err) {
    if (err) {
      return console.error(err);
    }
  });
  console.log('\x1b[32m', 'JS/TS files generated succesfully!');
  console.log('\x1b[32m', `All files generated at: ${path}`);
  createMDDoc(data);
};

async function createMDDoc(data) {
  console.log('\x1b[37m', 'Writting the documentation...');
  let doc = [`This is Bitso's general color palette.`, `Last generated:  ${new Date()}`];
  let tableHead = `||*Shade*||*Hex*||*RGB*||*HSL*||*Description*||`;
  for (const color in data) {
    let parent = data[color];
    let shades = [];
    for (const shade in parent) {
      let shadeObj = parent[shade];
      let shadeVar = `|{color:${shadeObj.hex}}■{color} ${shade} | ${shadeObj.hex} | ${shadeObj.rgb} | ${shadeObj.hsl} | ${shadeObj.description ? shadeObj.description : ' '}|`;
      await shades.push(shadeVar);
    }
    let table = [`h2.${color}  `, tableHead, ...shades];
    await doc.push(table.join('\n'));
  }
  let parsedDoc = await doc.join('\n');
  // console.log(doc.join('\n'));
  let requestOptions = {
    method: 'PUT',
    hostname: ENV.WIKI.HOSTNAME,
    path: ENV.WIKI.PATH + ENV.WIKI.PAGE_IDS.UNIVERSE,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': ENV.TOKEN,
    },
  };
  let requestBody = {
    type: "page",
    title: "Universe",
    space: { key: ENV.WIKI.SPACE },
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
      requestBody.version.number = docData.version.number + 1;
      const req = https.request(requestOptions, res => {
        res.on('data', chunk => {
          //process.stdout.write(chunk)
        });
        res.on('end', () => {
          console.log('\x1b[32m', 'Documentation updated succesfully!');
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

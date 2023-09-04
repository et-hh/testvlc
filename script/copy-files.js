const fs = require('fs');
const path = require('path');
const { promisify } = require('util');
const prettier = require('prettier');
const glob = require('glob');
const pkg = require('../package.json');

const open = promisify(fs.open);
const write = promisify(fs.write);

const {
  name,
  version,
  license,
  dependencies,
  main,
  author,
  description,
  devDependencies: { electron },
} = pkg;

async function getJSON() {
  const json = {
    version,
    name,
    main,
    author,
    description,
    license,
    dependencies,
    devDependencies: { electron },
  };
  return prettier.format(JSON.stringify(json), { semi: false, parser: 'json' });
}

async function writeFile(file, data, options, callback) {
  let fd;
  try {
    fd = await open(file, options.flag, options.mode);
    const buf = Buffer.isBuffer(data) ? data : Buffer.from(data, options.encoding || 'utf8');
    await write(fd, buf, 0, buf.length, 0);
    callback(null);
  } catch (error) {
    callback(error);
  } finally {
    fs.close(fd);
  }
}

(async function () {
  const files = fs.readdirSync('src/renderer');
  files.forEach((file) => {
    fs.copyFileSync(path.resolve(__dirname, `../src/renderer/${file}`), path.resolve(__dirname, `../app/renderer/${file}`));
  });

  const formatText = await getJSON();
  writeFile(
    path.resolve('app/package.json'),
    formatText,
    {
      encoding: 'utf8',
      flag: 'w',
      mode: 0o666,
    },
    () => {}
  );
})();

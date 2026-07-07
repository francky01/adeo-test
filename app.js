const { data } = require('./data');
const { parseArguments } = require('./src/cli/parse-arguments');
const { execute } = require('./src/cli/execute');

const options = parseArguments(process.argv.slice(2));
const result = execute(data, options);

if (result === undefined) {
  console.log('Usage: node app.js [--filter=pattern] [--count]');
  process.exit(1);
}

// depth: null prints the whole tree instead of collapsing nested objects
console.dir(result, { depth: null });

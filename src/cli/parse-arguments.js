const FILTER_OPTION = '--filter=';
const COUNT_OPTION = '--count';

/**
 * Parses the command-line arguments into structured options.
 *
 * @param {string[]} args e.g. ['--filter=ry', '--count']
 * @returns {{filter: string|undefined, count: boolean}}
 */
const parseArguments = (args) => {
  const filterArgument = args.find((arg) => arg.startsWith(FILTER_OPTION));

  return {
    filter: filterArgument && filterArgument.slice(FILTER_OPTION.length),
    count: args.includes(COUNT_OPTION),
  };
};

module.exports = { parseArguments };

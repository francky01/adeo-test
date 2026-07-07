const { filterAnimalsByName } = require('../core/filter-animals');
const { appendChildrenCount } = require('../core/count-children');

/**
 * Applies the requested options to the countries.
 *
 * When both options are given, the filter is applied first so that the
 * appended counts reflect the filtered data.
 *
 * @param {Array} countries
 * @param {{filter: string|undefined, count: boolean}} options
 * @returns {Array|undefined} the transformed countries, or undefined when no
 *   supported option is given
 */
const execute = (countries, options) => {
  if (options.filter === undefined && !options.count) {
    return undefined;
  }

  let result = countries;

  if (options.filter !== undefined) {
    result = filterAnimalsByName(result, options.filter);
  }

  if (options.count) {
    result = appendChildrenCount(result);
  }

  return result;
};

module.exports = { execute };

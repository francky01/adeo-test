/**
 * Appends the number of children to the name of each country and person,
 * e.g. `Satanwi [2]` for a country of 2 people.
 *
 * Animals are left untouched. The input is never mutated: new objects
 * are returned.
 *
 * @param {Array<{name: string, people: Array<{name: string, animals: Array<{name: string}>}>}>} countries
 * @returns {Array} the countries with counts appended to names
 */
const appendChildrenCount = (countries) =>
  countries.map((country) => ({
    ...country,
    name: `${country.name} [${country.people.length}]`,
    people: country.people.map((person) => ({
      ...person,
      name: `${person.name} [${person.animals.length}]`,
    })),
  }));

module.exports = { appendChildrenCount };

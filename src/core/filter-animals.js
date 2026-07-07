/**
 * Keeps only the animals whose name contains the given pattern.
 *
 * The match is case sensitive. The original order is preserved.
 * People and countries left without any animal are removed.
 * The input is never mutated: new objects are returned.
 *
 * @param {Array<{name: string, people: Array<{name: string, animals: Array<{name: string}>}>}>} countries
 * @param {string} pattern the substring to look for in animal names
 * @returns {Array} the filtered countries
 */
const filterAnimalsByName = (countries, pattern) =>
  countries
    .map((country) => ({
      ...country,
      people: country.people
        .map((person) => ({
          ...person,
          animals: person.animals.filter((animal) => animal.name.includes(pattern)),
        }))
        .filter((person) => person.animals.length > 0),
    }))
    .filter((country) => country.people.length > 0);

module.exports = { filterAnimalsByName };

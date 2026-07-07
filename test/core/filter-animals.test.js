const { filterAnimalsByName } = require('../../src/core/filter-animals');
const { data } = require('../../data');

const countries = [
  {
    name: 'Dillauti',
    people: [
      { name: 'Winifred Graham', animals: [{ name: 'Anoa' }, { name: 'Duck' }] },
      { name: 'Louise Pinzauti', animals: [{ name: 'Manta Ray' }, { name: 'Duck' }] },
    ],
  },
  {
    name: 'Satanwi',
    people: [{ name: 'Anthony Bruno', animals: [{ name: 'Caracal' }, { name: 'Oryx' }] }],
  },
];

describe('filterAnimalsByName', () => {
  it('keeps only the animals whose name contains the pattern', () => {
    const result = filterAnimalsByName(countries, 'ry');

    expect(result).toEqual([
      {
        name: 'Satanwi',
        people: [{ name: 'Anthony Bruno', animals: [{ name: 'Oryx' }] }],
      },
    ]);
  });

  it('removes people left without animals, then countries left without people', () => {
    const result = filterAnimalsByName(countries, 'Anoa');

    expect(result).toEqual([
      {
        name: 'Dillauti',
        people: [{ name: 'Winifred Graham', animals: [{ name: 'Anoa' }] }],
      },
    ]);
  });

  it('returns an empty array when nothing matches', () => {
    expect(filterAnimalsByName(countries, 'no-match')).toEqual([]);
  });

  it('matches case sensitively', () => {
    expect(filterAnimalsByName(countries, 'ORYX')).toEqual([]);
  });

  it('keeps the original order intact', () => {
    const result = filterAnimalsByName(countries, 'a');

    expect(result.map((country) => country.name)).toEqual(['Dillauti', 'Satanwi']);
  });

  it('does not mutate the input', () => {
    const input = structuredClone(countries);

    filterAnimalsByName(input, 'ry');

    expect(input).toEqual(countries);
  });

  it('produces the exact output expected by the assignment for the pattern "ry"', () => {
    expect(filterAnimalsByName(data, 'ry')).toEqual([
      {
        name: 'Uzuzozne',
        people: [{ name: 'Lillie Abbott', animals: [{ name: 'John Dory' }] }],
      },
      {
        name: 'Satanwi',
        people: [{ name: 'Anthony Bruno', animals: [{ name: 'Oryx' }] }],
      },
    ]);
  });
});

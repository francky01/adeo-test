const { appendChildrenCount } = require('../../src/core/count-children');
const { data } = require('../../data');

const countries = [
  {
    name: 'Dillauti',
    people: [
      { name: 'Winifred Graham', animals: [{ name: 'Anoa' }, { name: 'Duck' }] },
      { name: 'Louise Pinzauti', animals: [{ name: 'Manta Ray' }] },
    ],
  },
];

describe('appendChildrenCount', () => {
  it('appends the number of people to each country name', () => {
    const result = appendChildrenCount(countries);

    expect(result[0].name).toBe('Dillauti [2]');
  });

  it('appends the number of animals to each person name', () => {
    const result = appendChildrenCount(countries);

    expect(result[0].people[0].name).toBe('Winifred Graham [2]');
    expect(result[0].people[1].name).toBe('Louise Pinzauti [1]');
  });

  it('leaves the animals untouched', () => {
    const result = appendChildrenCount(countries);

    expect(result[0].people[0].animals).toEqual([{ name: 'Anoa' }, { name: 'Duck' }]);
  });

  it('returns an empty array when given an empty array', () => {
    expect(appendChildrenCount([])).toEqual([]);
  });

  it('does not mutate the input', () => {
    const input = structuredClone(countries);

    appendChildrenCount(input);

    expect(input).toEqual(countries);
  });

  it('produces the counts expected by the assignment on the full dataset', () => {
    const result = appendChildrenCount(data);

    expect(result[0].name).toBe('Dillauti [5]');
    expect(result[0].people[0].name).toBe('Winifred Graham [6]');
    expect(result[0].people[1].name).toBe('Blanche Viciani [8]');
    expect(result[4].name).toBe('Satanwi [5]');
  });
});

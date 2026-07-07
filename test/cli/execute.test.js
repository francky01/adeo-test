const { execute } = require('../../src/cli/execute');

const countries = [
  {
    name: 'Satanwi',
    people: [{ name: 'Anthony Bruno', animals: [{ name: 'Caracal' }, { name: 'Oryx' }] }],
  },
];

describe('execute', () => {
  it('filters the countries when a filter is given', () => {
    const result = execute(countries, { filter: 'ry', count: false });

    expect(result).toEqual([
      { name: 'Satanwi', people: [{ name: 'Anthony Bruno', animals: [{ name: 'Oryx' }] }] },
    ]);
  });

  it('appends the counts when count is requested', () => {
    const result = execute(countries, { filter: undefined, count: true });

    expect(result[0].name).toBe('Satanwi [1]');
    expect(result[0].people[0].name).toBe('Anthony Bruno [2]');
  });

  it('filters before counting when both options are given', () => {
    const result = execute(countries, { filter: 'ry', count: true });

    expect(result).toEqual([
      { name: 'Satanwi [1]', people: [{ name: 'Anthony Bruno [1]', animals: [{ name: 'Oryx' }] }] },
    ]);
  });

  it('returns undefined when no option is given', () => {
    expect(execute(countries, { filter: undefined, count: false })).toBeUndefined();
  });
});

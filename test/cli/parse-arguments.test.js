const { parseArguments } = require('../../src/cli/parse-arguments');

describe('parseArguments', () => {
  it('extracts the filter pattern', () => {
    expect(parseArguments(['--filter=ry'])).toEqual({ filter: 'ry', count: false });
  });

  it('detects the count option', () => {
    expect(parseArguments(['--count'])).toEqual({ filter: undefined, count: true });
  });

  it('supports both options at once', () => {
    expect(parseArguments(['--filter=ry', '--count'])).toEqual({ filter: 'ry', count: true });
  });

  it('returns no option for unknown arguments', () => {
    expect(parseArguments(['--unknown'])).toEqual({ filter: undefined, count: false });
  });

  it('returns no option when there is no argument', () => {
    expect(parseArguments([])).toEqual({ filter: undefined, count: false });
  });
});

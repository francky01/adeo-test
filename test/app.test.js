const { execFile } = require('node:child_process');
const { promisify } = require('node:util');
const path = require('node:path');

const execFileAsync = promisify(execFile);
const appPath = path.join(__dirname, '..', 'app.js');

const runApp = (...args) => execFileAsync('node', [appPath, ...args]);

describe('app.js (end to end)', () => {
  it('prints the filtered countries for --filter=ry', async () => {
    const { stdout } = await runApp('--filter=ry');

    expect(stdout).toMatch(/John Dory/);
    expect(stdout).toMatch(/Oryx/);
    expect(stdout).not.toMatch(/Dillauti/);
  });

  it('prints the counts for --count', async () => {
    const { stdout } = await runApp('--count');

    expect(stdout).toMatch(/Dillauti \[5\]/);
    expect(stdout).toMatch(/Winifred Graham \[6\]/);
  });

  it('prints the whole tree without collapsing nested objects', async () => {
    const { stdout } = await runApp('--count');

    expect(stdout).not.toMatch(/\[Object\]/);
  });

  it('prints the usage and exits with an error code when no option is given', async () => {
    await expect(runApp()).rejects.toMatchObject({
      code: 1,
      stdout: expect.stringMatching(/Usage/),
    });
  });
});

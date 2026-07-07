# Javascript developer test

## Filter

Your job is to write a command-line interface in Node.js. 
This program has to filter a list of elements containing a pattern.

Details:
- In the following file `data.js`, there are `Countries` containing `Peoples` containing `Animals`.
- Only animals containing `ry` are displayed. The order should be kept intact.
- Empty array after filtering are NOT returned.

Sample of running the command, and its output:

```shell script
$ node app.js --filter=ry
[
  {
    name: 'Uzuzozne',
    people: [
      {
        name: 'Lillie Abbott',
        animals: [
          {
            name: 'John Dory'
          }
        ]
      }
    ]
  },
  {
    name: 'Satanwi',
    people: [
      {
        name: 'Anthony Bruno',
        animals: [
          {
            name: 'Oryx'
          }
        ]
      }
    ]
  }
]
```

## Count

The next goal is to print the counts of People and Animals by counting the number of children and appending it in the name, eg. `Satanwi [2]`.

Sample of running the command, and its output:

```shell script
node app.js --count
[ { name: 'Dillauti [5]',
    people:
     [ { name: 'Winifred Graham [6]',
         animals:
          [ { name: 'Anoa' },
            { name: 'Duck' },
            { name: 'Narwhal' },
            { name: 'Badger' },
            { name: 'Cobra' },
            { name: 'Crow' } ] },
       { name: 'Blanche Viciani [8]',
         animals:
          [ { name: 'Barbet' },
            { name: 'Rhea' },
            { name: 'Snakes' },
            { name: 'Antelope' },
            { name: 'Echidna' },
            { name: 'Crow' },
            { name: 'Guinea Fowl' },
            { name: 'Deer Mouse' } ] },
      ...
...
]
```

## Requirements

- The code must be available in a GIT repository
- No library/modules should be used, except for the testing library

## Appreciation

We will be really attentive to:

- Code readability, structure and consistency
- Tests, and how they are written

---

## Solution

Requires Node.js >= 20. The application itself has zero dependency, in
line with the "no library" requirement; Jest is the only (dev)
dependency, used exclusively for the tests as allowed by the assignment.

### Usage

```shell script
node app.js --filter=ry     # keep only animals whose name contains "ry"
node app.js --count         # append children counts to names, e.g. "Satanwi [5]"
node app.js --filter=ry --count   # both: filter first, then count
```

### Tests

```shell script
npm install
npm test              # run the Jest test suite
npm run test:coverage # same, with a coverage report
```

### Project structure

```
app.js                        entry point: argv in, console out
data.js                       the dataset
src/
  core/                       business logic (pure functions)
    filter-animals.js         keep animals matching a pattern, drop empty nodes
    count-children.js         append [n] to country and person names
  cli/
    parse-arguments.js        raw argv -> structured options
    execute.js                applies the options to the data
test/                         mirrors src/, plus app.test.js (end to end)
```

### Design notes

- **Pure functions everywhere**: the core never mutates its input and
  returns new objects, which makes it trivial to test and to compose.
- **Thin entry point**: `app.js` only wires parsing, execution and
  printing; all the logic lives in `src/` and is unit-tested.
- **Output format**: `console.dir(result, { depth: null })` prints the
  whole tree in the exact format shown in the assignment samples.
- **Filtering is case sensitive** and relies on substring matching, as
  implied by the `--filter=ry` sample output.

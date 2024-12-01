# advent-of-code-solutions

## Generate Daily Boilerplate

When solving these problems, you always need to read a large input, and iterate over it. 

This repo has an npm command that generates a few files for each day so you can immediately start solving the problem.

To generate the structure of a solution for a day, run
```
npm run gen -- {int}
```
The placeholder should represent the "day" you're solving. 

For example `npm run gen -- 3` does the following:
- Create a 2024/day3.js file
- Create a 2024/day3.txt file

The js file follows the structure:

```
import fs from 'fs';

function findSolution(input) {
  let solution = 0;

  input.forEach(line => {
    console.log(line)
    // Do something
  });

  return solution;
}

fs.readFile('./2024/day${dayNumber}.txt', 'utf8', (err, data) => {
  if (err) {
    console.error('Error reading the file:', err);
    return;
  }
  console.log(findSolution(data));
});
```

## Set up your input

Then grab your challenge input and store it in the `.txt` file for that day, which will be in the project at:
```
{year}/day{number}.txt
```

## Running solutions

Finally, execute the code by running

```
npm run day3
```

The package.json run script automatically gets created by the generate command above. You just need to run day {whatever}!

By default, it will just iterate over the text file. 

Add your actual solution logic in `findSolution()` in ./2024/day{whatever}.js
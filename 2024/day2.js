import fs from 'fs';

function findSolution(input) {
  let solution = 0;

  input.forEach(line => {
    // Do something
  });

  return solution;
}

fs.readFile('./2024/day2.txt', 'utf8', (err, data) => {
  if (err) {
    console.error('Error reading the file:', err);
    return;
  }
  console.log(findSolution(data));
});
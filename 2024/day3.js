import fs from 'fs';

function findSolution(input) {
  let solution = 0;
  const lines = input.trim().split('\n');

  lines.forEach(line => {
    // Use a regular expression to match valid mul(X,Y) instructions
    const regex = /mul\((\d+),(\d+)\)/g;
    let match;

    // Iterate over all matches in the line
    while ((match = regex.exec(line)) !== null) {
      const x = parseInt(match[1], 10); // Extract first number
      const y = parseInt(match[2], 10); // Extract second number
      solution += x * y; // Add the product to the solution
    }
  });

  return solution;
}

function findSolutionPart2(input) {
  let solution = 0;
  let mulEnabled = true; // Track if mul instructions are enabled
  const regex = /mul\((\d+),(\d+)\)|do\(\)|don't\(\)/g; // Match mul(X,Y), do(), or don't()
  const matches = input.matchAll(regex);

  for (const match of matches) {
    if (match[0] === 'do()') {
      mulEnabled = true; // Enable mul instructions
    } else if (match[0] === "don't()") {
      mulEnabled = false; // Disable mul instructions
    } else if (mulEnabled && match[0].startsWith('mul(')) {
      // Process mul(X,Y) if enabled
      const x = parseInt(match[1], 10);
      const y = parseInt(match[2], 10);
      solution += x * y;
    }
  }

  return solution;
}

fs.readFile('./2024/day3.txt', 'utf8', (err, data) => {
  if (err) {
    console.error('Error reading the file:', err);
    return;
  }
  console.log('Part 1:', findSolution(data));
  console.log('Part 2:', findSolutionPart2(data));
});

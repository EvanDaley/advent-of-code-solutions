import fs from 'fs';

function findSolution(input) {
  let solution = 0;

  input.forEach(line => {
    const levels = line.split(' ').map(Number);
    let isSafe = true;

    for (let i = 1; i < levels.length; i++) {
      const diff = levels[i] - levels[i - 1];
      if (Math.abs(diff) < 1 || Math.abs(diff) > 3) {
        isSafe = false; // Check the adjacent difference condition
        break;
      }
      if (i > 1 && (levels[i] - levels[i - 1]) * (levels[i - 1] - levels[i - 2]) < 0) {
        isSafe = false; // Ensure all levels are either increasing or decreasing
        break;
      }
    }

    if (isSafe) {
      solution++;
    }
  });

  return solution;
}

fs.readFile('./2024/day2.txt', 'utf8', (err, data) => {
  if (err) {
    console.error('Error reading the file:', err);
    return;
  }
  const lines = data.trim().split('\n');
  console.log(findSolution(lines));
});


function isReportSafe(levels) {
  for (let i = 1; i < levels.length; i++) {
    const diff = levels[i] - levels[i - 1];
    if (Math.abs(diff) < 1 || Math.abs(diff) > 3) return false; // Adjacent difference condition
  }

  // Check if all differences have the same sign (monotonicity)
  const isIncreasing = levels.every((_, i) => i === 0 || levels[i] >= levels[i - 1]);
  const isDecreasing = levels.every((_, i) => i === 0 || levels[i] <= levels[i - 1]);

  return isIncreasing || isDecreasing;
}

function findSolution2(input) {
  let solution = 0;

  input.forEach(line => {
    const levels = line.split(' ').map(Number);

    // Check if the report is safe without any modification
    if (isReportSafe(levels)) {
      solution++;
      return;
    }

    // Use Problem Dampener: Check if removing any single level makes the report safe
    for (let i = 0; i < levels.length; i++) {
      const modifiedLevels = levels.slice(0, i).concat(levels.slice(i + 1)); // Remove one level
      if (isReportSafe(modifiedLevels)) {
        solution++;
        return;
      }
    }
  });

  return solution;
}

fs.readFile('./2024/day2.txt', 'utf8', (err, data) => {
  if (err) {
    console.error('Error reading the file:', err);
    return;
  }
  const lines = data.trim().split('\n');
  console.log(findSolution2(lines));
});

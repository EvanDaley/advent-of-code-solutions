import fs from 'fs';

function findSolution(input) {
  let solution = 0;

  const directions = [
    [-1, 0], [1, 0], [0, -1], [0, 1],  // up, down, left, right
    [-1, -1], [-1, 1], [1, -1], [1, 1]  // diagonals
  ];

  const numberLocations = new Map();
  const symbolLocations = [];

  input = input.split('\n'); // Split input into rows

  // Process each line to detect numbers and symbols
  for (let row = 0; row < input.length; row++) {
    const line = input[row];

    // Find all numbers
    let match;
    const numberRegex = /\d+/g;
    while ((match = numberRegex.exec(line)) !== null) {
      const number = parseInt(match[0], 10);
      const col = match.index;
      numberLocations.set(`${row},${col}`, number);
    }

    // Find all symbols
    const symbolRegex = /[^.0-9]/g;
    while ((match = symbolRegex.exec(line)) !== null) {
      const col = match.index;
      symbolLocations.push({ row, col });
    }
  }

  // Check each symbol's neighbors to see if they are adjacent to any part number
  for (let symbol of symbolLocations) {
    const { row, col } = symbol;

    for (let [di, dj] of directions) {
      const ni = row + di;
      const nj = col + dj;

      // Check if within bounds
      if (ni >= 0 && ni < input.length && nj >= 0 && nj < input[ni].length) {
        const key = `${ni},${nj}`;
        if (numberLocations.has(key)) {
          solution += numberLocations.get(key);
          numberLocations.delete(key); // Remove the number after it’s added
        }
      }
    }
  }

  return solution;
}

fs.readFile('./2023/day3.txt', 'utf8', (err, data) => {
  if (err) {
    console.error('Error reading the file:', err);
    return;
  }
  console.log('Solution:', findSolution(data));
});

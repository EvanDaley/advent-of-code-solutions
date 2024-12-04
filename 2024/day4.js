import fs from 'fs';

function countXMAS(grid) {
  const rows = grid.length;
  const cols = grid[0].length;
  const word = 'XMAS';
  const wordLength = word.length;
  let count = 0;

  const directions = [
    [0, 1],    // Right
    [0, -1],   // Left
    [1, 0],    // Down
    [-1, 0],   // Up
    [1, 1],    // Down-right diagonal
    [1, -1],   // Down-left diagonal
    [-1, 1],   // Up-right diagonal
    [-1, -1]   // Up-left diagonal
  ];

  function isValidPosition(row, col) {
    return row >= 0 && col >= 0 && row < rows && col < cols;
  }

  function checkDirection(row, col, dir) {
    for (let i = 0; i < wordLength; i++) {
      const newRow = row + dir[0] * i;
      const newCol = col + dir[1] * i;
      if (!isValidPosition(newRow, newCol) || grid[newRow][newCol] !== word[i]) {
        return false;
      }
    }
    return true;
  }

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      for (const dir of directions) {
        if (checkDirection(row, col, dir)) {
          count++;
        }
      }
    }
  }

  return count;
}

fs.readFile('./2024/day4.txt', 'utf8', (err, data) => {
  if (err) {
    console.error('Error reading the file:', err);
    return;
  }

  const grid = data.trim().split('\n').map(line => line.split(''));
  console.log('Total XMAS occurrences:', countXMAS(grid));
});


function countXMASPart2(grid) {
  const rows = grid.length;
  const cols = grid[0].length;
  const word = 'MAS';
  const wordLength = word.length;
  let count = 0;

  const topLeftToBottomRight = [
    [0, 0], // Top-left M
    [1, 1], // Center A
    [2, 2]  // Bottom-right S
  ];

  const topRightToBottomLeft = [
    [0, 2], // Top-right M
    [1, 1], // Center A
    [2, 0]  // Bottom-left S
  ];

  function isValidPosition(row, col) {
    return row >= 0 && col >= 0 && row < rows && col < cols;
  }

  function checkPattern(row, col, pattern) {
    let forwardMAS = true;
    let backwardMAS = true;

    for (let i = 0; i < wordLength; i++) {
      const newRow = row + pattern[i][0];
      const newCol = col + pattern[i][1];

      if (!isValidPosition(newRow, newCol)) {
        return false;
      }

      if (grid[newRow][newCol] !== word[i]) forwardMAS = false;
      if (grid[newRow][newCol] !== word[wordLength - 1 - i]) backwardMAS = false;
    }

    return forwardMAS || backwardMAS;
  }

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      if (checkPattern(row, col, topLeftToBottomRight) &&
        checkPattern(row, col, topRightToBottomLeft)) {
        count++;
      }
    }
  }

  return count;
}

fs.readFile('./2024/day4.txt', 'utf8', (err, data) => {
  if (err) {
    console.error('Error reading the file:', err);
    return;
  }

  const grid = data.trim().split('\n').map(line => line.split(''));
  console.log('Part 2:', countXMASPart2(grid));
});

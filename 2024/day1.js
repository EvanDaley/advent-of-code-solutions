import fs from 'fs';

function findSolution(input) {
  // Split the input into lines and parse them into two separate arrays for left and right lists
  const lines = input.trim().split('\n');
  const leftList = [];
  const rightList = [];

  lines.forEach(line => {
    const [left, right] = line.split(/\s+/).map(Number);
    leftList.push(left);
    rightList.push(right);
  });

  // Sort both lists
  leftList.sort((a, b) => a - b);
  rightList.sort((a, b) => a - b);

  // Calculate the total distance
  let totalDistance = 0;
  for (let i = 0; i < leftList.length; i++) {
    totalDistance += Math.abs(leftList[i] - rightList[i]);
  }

  return totalDistance;
}

fs.readFile('./2024/day1.txt', 'utf8', (err, data) => {
  if (err) {
    console.error('Error reading the file:', err);
    return;
  }
  console.log('Solution:', findSolution(data));
});

function findSolutionPart2(input) {
  // Split the input into lines and parse them into two separate arrays for left and right lists
  const lines = input.trim().split('\n');
  const leftList = [];
  const rightList = [];

  lines.forEach(line => {
    const [left, right] = line.split(/\s+/).map(Number);
    leftList.push(left);
    rightList.push(right);
  });

  // Create a frequency map for the right list
  const rightFrequency = new Map();
  rightList.forEach(num => {
    rightFrequency.set(num, (rightFrequency.get(num) || 0) + 1);
  });

  // Calculate the similarity score
  let similarityScore = 0;
  leftList.forEach(num => {
    const count = rightFrequency.get(num) || 0;
    similarityScore += num * count;
  });

  return similarityScore;
}

fs.readFile('./2024/day1.txt', 'utf8', (err, data) => {
  if (err) {
    console.error('Error reading the file:', err);
    return;
  }
  console.log('Solution (Part 2):', findSolutionPart2(data));
});

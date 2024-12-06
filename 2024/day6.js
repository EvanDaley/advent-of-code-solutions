import fs from 'fs';

function findSolution(input) {
  let solution = 0;
  const lines = input.trim().split('\n');

  // Parse the map into a grid and find the guard's initial position and direction
  const grid = lines.map(line => line.split(''));
  const directions = ['^', '>', 'v', '<']; // Up, Right, Down, Left
  const moves = [[-1, 0], [0, 1], [1, 0], [0, -1]]; // Corresponding moves for directions
  let guard = { x: 0, y: 0, dir: 0 }; // x, y, and direction index (0 = Up)

  // Find the guard's initial position and facing direction
  for (let r = 0; r < grid.length; r++) {
    for (let c = 0; c < grid[r].length; c++) {
      if (directions.includes(grid[r][c])) {
        guard = { x: r, y: c, dir: directions.indexOf(grid[r][c]) };
        grid[r][c] = '.'; // Clear the guard's starting position
      }
    }
  }

  // To track visited positions
  const visited = new Set();
  const key = (x, y) => `${x},${y}`;
  visited.add(key(guard.x, guard.y));

  while (true) {
    const [dx, dy] = moves[guard.dir];
    const nextX = guard.x + dx;
    const nextY = guard.y + dy;

    // Check if the guard has left the map
    if (
      nextX < 0 || nextX >= grid.length ||
      nextY < 0 || nextY >= grid[0].length
    ) {
      break; // Exit if the guard leaves the map
    }

    // If there's an obstacle in front, turn right
    if (grid[nextX][nextY] === '#') {
      guard.dir = (guard.dir + 1) % 4;
    } else {
      // Move forward
      guard.x = nextX;
      guard.y = nextY;
      visited.add(key(guard.x, guard.y));
    }
  }

  solution = visited.size; // Number of distinct positions visited
  return solution;
}

function findSolution2(input) {
  const lines = input.trim().split('\n');

  // Parse the map into a grid and find the guard's initial position and direction
  const grid = lines.map(line => line.split(''));
  const directions = ['^', '>', 'v', '<']; // Up, Right, Down, Left
  const moves = [[-1, 0], [0, 1], [1, 0], [0, -1]]; // Corresponding moves for directions
  let guard = { x: 0, y: 0, dir: 0 }; // x, y, and direction index (0 = Up)

  // Find the guard's initial position and facing direction
  for (let r = 0; r < grid.length; r++) {
    for (let c = 0; c < grid[r].length; c++) {
      if (directions.includes(grid[r][c])) {
        guard = { x: r, y: c, dir: directions.indexOf(grid[r][c]) };
        grid[r][c] = '.'; // Clear the guard's starting position
      }
    }
  }

  // Helper function to simulate the guard's patrol
  function simulate(grid, startGuard) {
    const visited = new Set();
    const key = (x, y, dir) => `${x},${y},${dir}`;
    let { x, y, dir } = startGuard;

    while (true) {
      const [dx, dy] = moves[dir];
      const nextX = x + dx;
      const nextY = y + dy;

      // Check if the guard has left the map
      if (
        nextX < 0 || nextX >= grid.length ||
        nextY < 0 || nextY >= grid[0].length
      ) {
        return false; // Guard left the map
      }

      // If there's an obstacle in front, turn right
      if (grid[nextX][nextY] === '#') {
        dir = (dir + 1) % 4;
      } else {
        // Move forward
        x = nextX;
        y = nextY;

        // Check if the guard revisits a position with the same direction
        const state = key(x, y, dir);
        if (visited.has(state)) {
          return true; // Guard is stuck in a loop
        }
        visited.add(state);
      }
    }
  }

  // Find all valid positions to add a new obstruction
  const validPositions = new Set();
  for (let r = 0; r < grid.length; r++) {
    for (let c = 0; c < grid[r].length; c++) {
      // Skip positions with existing obstacles or the guard's starting position
      if (grid[r][c] !== '.' || (r === guard.x && c === guard.y)) continue;

      // Temporarily place an obstruction and simulate the guard's patrol
      grid[r][c] = '#';
      const result = simulate(grid, { ...guard });
      grid[r][c] = '.'; // Restore the grid

      if (result) {
        validPositions.add(`${r},${c}`);
      }
    }
  }

  return validPositions.size; // Number of valid positions for new obstructions
}

fs.readFile('./2024/day6.txt', 'utf8', (err, data) => {
  if (err) {
    console.error('Error reading the file:', err);
    return;
  }
  console.log(findSolution(data));
  console.log(findSolution2(data));
});

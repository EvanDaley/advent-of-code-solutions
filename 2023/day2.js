import fs from 'fs';

function findSolution(input) {
  let solution = 0;

  const availableCubes = {
    red: 12,
    green: 13,
    blue: 14,
  };

  // Split the input into lines for each game
  const games = input.trim().split('\n');

  games.forEach(game => {
    const [gameId, cubesData] = game.split(': ');
    const gameIdNum = parseInt(gameId.replace('Game ', ''), 10);
    const sets = cubesData.split(';');

    let isPossible = true;

    // For each set of cubes in the game
    sets.forEach(set => {
      const cubes = set.split(',').map(cube => cube.trim());

      cubes.forEach(cube => {
        const [count, color] = cube.split(' ');
        if (parseInt(count, 10) > availableCubes[color]) {
          isPossible = false;
        }
      });
    });

    if (isPossible) {
      solution += gameIdNum;
    }
  });

  return solution;
}

fs.readFile('./2023/day2.txt', 'utf8', (err, data) => {
  if (err) {
    console.error('Error reading the file:', err);
    return;
  }
  console.log(findSolution(data));
});

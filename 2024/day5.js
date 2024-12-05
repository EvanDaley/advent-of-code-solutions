import fs from 'fs';

function findSolution(input) {
  let solution = 0;
  let partTwoSolution = 0;

  const sections = input.trim().split('\n\n');
  if (sections.length < 2) {
    console.error('Invalid input format: Missing rules or updates sections.');
    return;
  }

  const [rulesSection, updatesSection] = sections;
  const rules = new Map();
  const updates = updatesSection.split('\n').map(update => update.split(',').map(Number));

  // Parse the rules
  rulesSection.split('\n').forEach(rule => {
    const [a, b] = rule.split('|').map(Number);
    if (!rules.has(a)) rules.set(a, new Set());
    rules.get(a).add(b);
  });

  // Function to check if an update is correctly ordered
  function isUpdateCorrect(update) {
    const position = new Map();
    update.forEach((page, index) => position.set(page, index));

    for (const [a, dependents] of rules) {
      if (!position.has(a)) continue; // Skip rules with missing pages
      for (const b of dependents) {
        if (!position.has(b)) continue; // Skip rules with missing pages
        if (position.get(a) > position.get(b)) return false; // Rule violated
      }
    }
    return true;
  }

  // Function to order an update correctly
  function orderUpdate(update) {
    const dependencies = new Map(update.map(page => [page, new Set()]));

    // Build dependency graph for this update
    for (const [a, dependents] of rules) {
      if (!dependencies.has(a)) continue;
      dependents.forEach(b => {
        if (dependencies.has(b)) {
          dependencies.get(b).add(a); // Page `b` depends on `a`
        }
      });
    }

    // Perform topological sort
    const sorted = [];
    const visited = new Set();

    function visit(page) {
      if (visited.has(page)) return;
      visited.add(page);
      for (const dep of dependencies.get(page) || []) {
        visit(dep);
      }
      sorted.push(page);
    }

    update.forEach(page => visit(page));
    return sorted.reverse();
  }

  // Process updates
  updates.forEach(update => {
    if (isUpdateCorrect(update)) {
      const middleIndex = Math.floor(update.length / 2);
      solution += update[middleIndex];
    } else {
      const orderedUpdate = orderUpdate(update);
      const middleIndex = Math.floor(orderedUpdate.length / 2);
      partTwoSolution += orderedUpdate[middleIndex];
    }
  });

  console.log('Part One Solution:', solution);
  console.log('Part Two Solution:', partTwoSolution);
}

fs.readFile('./2024/day5.txt', 'utf8', (err, data) => {
  if (err) {
    console.error('Error reading the file:', err);
    return;
  }
  findSolution(data);
});

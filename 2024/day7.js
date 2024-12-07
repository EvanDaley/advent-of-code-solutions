import fs from 'fs';

function findSolution(input) {
  let solution = 0;

  const lines = input.trim().split('\n');

  function canFormTarget(target, nums) {
    // If there's only one number, just check equality
    if (nums.length === 1) {
      return nums[0] === target;
    }

    const opsCount = nums.length - 1;
    const operators = ['+', '*', '||'];

    function evaluateSequence(nums, ops) {
      // Evaluate left-to-right
      let val = nums[0];
      for (let i = 0; i < ops.length; i++) {
        let nextNum = nums[i+1];
        switch (ops[i]) {
          case '+':
            val = val + nextNum;
            break;
          case '*':
            val = val * nextNum;
            break;
          case '||':
            // Concatenate as strings
            val = parseInt(val.toString() + nextNum.toString(), 10);
            break;
        }
      }
      return val;
    }

    const totalCombinations = Math.pow(3, opsCount);
    for (let comb = 0; comb < totalCombinations; comb++) {
      let ops = [];
      let temp = comb;
      for (let i = 0; i < opsCount; i++) {
        ops.push(operators[temp % 3]);
        temp = Math.floor(temp / 3);
      }
      const val = evaluateSequence(nums, ops);
      if (val === target) {
        return true;
      }
    }

    return false;
  }

  lines.forEach(line => {
    const [left, right] = line.split(':');
    if (!right) {
      return; // skip if line malformed
    }

    const target = parseInt(left.trim(), 10);
    const nums = right.trim().split(' ').map(n => parseInt(n, 10));
    if (canFormTarget(target, nums)) {
      solution += target;
    }
  });

  return solution;
}

fs.readFile('./2024/day7.txt', 'utf8', (err, data) => { 
  if (err) {
    console.error('Error reading the file:', err);
    return;
  }
  console.log(findSolution(data));
});

// 932137732557
// 661823605105500
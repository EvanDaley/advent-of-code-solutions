import fs from 'fs';
import path from 'path';

// Get the current directory using import.meta.url
const __dirname = path.dirname(new URL(import.meta.url).pathname);

// Get the number from command line arguments
const dayNumber = process.argv[2];

if (!dayNumber) {
  console.error('Please provide a number for the day.');
  process.exit(1);
}

// Create the directory for 2024 if it doesn't exist
const yearDir = path.join(__dirname, '2024');
if (!fs.existsSync(yearDir)) {
  fs.mkdirSync(yearDir);
}

// Create the content for day{number}.js
const jsContent = `import fs from 'fs';

function findSolution(input) {
  let solution = 0;

  const lines = input.trim().split('\\n');

  lines.forEach(line => {
    console.log(line)
    // Do something
  });

  return solution;
}

fs.readFile('./2024/day${dayNumber}.txt', 'utf8', (err, data) => {
  if (err) {
    console.error('Error reading the file:', err);
    return;
  }
  console.log(findSolution(data));
});`;

// Create the content for day{number}.json
const jsonContent = ''

// Set the file paths, nested under the 2024 folder
const jsFilePath = path.join(yearDir, `day${dayNumber}.js`);
const jsonFilePath = path.join(yearDir, `day${dayNumber}.txt`);

// Write the JS file
fs.writeFileSync(jsFilePath, jsContent);
console.log(`Created file: ${jsFilePath}`);

// Write the TXT file
fs.writeFileSync(jsonFilePath, jsonContent);
console.log(`Created file: ${jsonFilePath}`);

// Add a new script entry for the day in package.json
const packageJsonPath = path.join(__dirname, 'package.json');
const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8'));

// Add the new script entry for the day
packageJson.scripts[`day${dayNumber}`] = `node 2024/day${dayNumber}.js`;

// Write the updated package.json back to the file
fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));
console.log(`Added script for day${dayNumber} to package.json`);

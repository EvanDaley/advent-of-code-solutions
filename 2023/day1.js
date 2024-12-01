function sumOfCalibrationValues(calibrationDocument) {
  let totalSum = 0;

  calibrationDocument.forEach(line => {
    const digits = line.replace(/\D/g, '');
    console.log(`Digits extracted from line: ${digits}`);

    if (digits.length > 0) {
      const firstDigit = digits[0];
      const lastDigit = digits[digits.length - 1];

      const calibrationValue = parseInt(firstDigit + lastDigit);

      totalSum += calibrationValue;
    }
  });

  return totalSum;
}

import data from './day1.json' assert { type: 'json' };
console.log(sumOfCalibrationValues(data['data']));
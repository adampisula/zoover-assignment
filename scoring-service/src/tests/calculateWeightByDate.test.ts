const { calculateWeightByDate } = require("../utils/calculateWeightByDate");
const { compareNumbers } = require("../utils/compareNumbers");
const { MILLISECONDS_IN_ONE_DAY, MILLISECONDS_IN_ONE_MONTH } = require("../utils/constants");

const now_time = new Date();

const date_1 = new Date( // date two days ago
  now_time.getTime() -
  (2 * MILLISECONDS_IN_ONE_DAY)
);
const expectedWeight_1 = 3.2189;
const calculatedWeight_1 = calculateWeightByDate(date_1, now_time);
const testPassed_1 = compareNumbers(expectedWeight_1, calculatedWeight_1);
console.log("Test 1: " + (testPassed_1 ? "PASSED" : "FAILED"));

const date_2 = new Date( // date a month and a day ago
  now_time.getTime() -
  (MILLISECONDS_IN_ONE_MONTH + MILLISECONDS_IN_ONE_DAY)
);
const expectedWeight_2 = 3.1781;
const calculatedWeight_2 = calculateWeightByDate(date_2, now_time);
const testPassed_2 = compareNumbers(expectedWeight_2, calculatedWeight_2);
console.log("Test 2: " + (testPassed_2 ? "PASSED" : "FAILED"));

const date_3 = new Date( // date 17 months and 13 days ago
  now_time.getTime() -
  (17 * MILLISECONDS_IN_ONE_MONTH + 13 * MILLISECONDS_IN_ONE_DAY)
);
const expectedWeight_3 = 2.0794;
const calculatedWeight_3 = calculateWeightByDate(date_3, now_time);
const testPassed_3 = compareNumbers(expectedWeight_3, calculatedWeight_3);
console.log("Test 3: " + (testPassed_3 ? "PASSED" : "FAILED"));

const date_4 = new Date( // date 26 months and 4 days ago
  now_time.getTime() -
  (26 * MILLISECONDS_IN_ONE_MONTH + 4 * MILLISECONDS_IN_ONE_DAY)
);
const expectedWeight_4 = 0.57098;
const calculatedWeight_4 = calculateWeightByDate(date_4, now_time);
const testPassed_4 = compareNumbers(expectedWeight_4, calculatedWeight_4);
console.log("Test 4: " + (testPassed_4 ? "PASSED" : "FAILED"));



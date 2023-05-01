import { calculateWeightByDate } from "./calculateWeightByDate";
import { compareNumbers } from "./compareNumbers";
import { MILLISECONDS_IN_ONE_DAY, MILLISECONDS_IN_ONE_MONTH } from "./constants";

import { beforeAll, describe, expect, test } from '@jest/globals';

let nowTime: Date;

describe('calculateWeightByDate util', () => {
  beforeAll(() => {
    nowTime = new Date();
  });

  test('correctly calculates weight from two days ago', () => {
    const date = new Date(nowTime.getTime() - (2 * MILLISECONDS_IN_ONE_DAY));
    const calculatedWeight = calculateWeightByDate(date, nowTime);
    const expectedWeight = 3.2189;

    const passed = compareNumbers(expectedWeight, calculatedWeight); // should use expect().toBeCloseTo

    expect(passed);
  });

  test('correctly calculates weight from one month and a day ago', () => {
    const date = new Date(nowTime.getTime() - (MILLISECONDS_IN_ONE_MONTH + MILLISECONDS_IN_ONE_DAY));
    const calculatedWeight = calculateWeightByDate(date, nowTime);
    const expectedWeight = 3.1781;

    const passed = compareNumbers(expectedWeight, calculatedWeight); // should use expect().toBeCloseTo

    expect(passed);
  });

  test('correctly calculates weight from 17 months and 13 days ago', () => {
    const date = new Date(nowTime.getTime() - (17 * MILLISECONDS_IN_ONE_MONTH + 13 * MILLISECONDS_IN_ONE_DAY));
    const calculatedWeight = calculateWeightByDate(date, nowTime);
    const expectedWeight = 2.0794;

    const passed = compareNumbers(expectedWeight, calculatedWeight); // should use expect().toBeCloseTo

    expect(passed);
  });

  test('correctly calculates weight from 26 months and 4 days ago', () => {
    const date = new Date(nowTime.getTime() - (26 * MILLISECONDS_IN_ONE_MONTH + 4 * MILLISECONDS_IN_ONE_DAY));
    const calculatedWeight = calculateWeightByDate(date, nowTime);
    const expectedWeight = 0.57098;

    const passed = compareNumbers(expectedWeight, calculatedWeight); // should use expect().toBeCloseTo

    expect(passed);
  });
});


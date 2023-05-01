export function compareNumbers(a: number, b: number, maxDeviation = 0.00003) { // max deviation: 0.003% (sensible default)
  const difference = Math.abs(a - b);
  const meanDeviationRatio = difference / ((a + b) / 2);

  return meanDeviationRatio <= maxDeviation;
}


import { beforeAll, describe, expect, test } from "@jest/globals";
import { Review, ReviewStatus } from "../types/review";
import { WEIGHT_OLDER_THAN_TWO_YEARS } from "./constants";
import { calculateWeightedScoreAspects } from "./calculateWeightedScoreAspects";

const reviews: Review[] = [
  {
    id: "a",
    zooverReviewId: 1,
    userName: "Test",
    title: "Test Review #1",
    text: "I am a test review.",
    status: ReviewStatus.APPROVED,
    generalScore: 0,
    scoreAspects: {
      room: undefined,
      price_quality: 10,
    },
    createdAt: new Date("2023-04-16T12:34:56.000Z"), // two weeks before
    updatedAt: new Date("2023-04-16T12:34:56.000Z"),
  },
  {
    id: "b",
    zooverReviewId: 2,
    userName: "Test",
    title: "Test Review #2",
    text: "I am a test review.",
    status: ReviewStatus.APPROVED,
    generalScore: 0,
    scoreAspects: {
      room: 1,
      price_quality: 9,
    },
    createdAt: new Date("2023-02-16T12:34:56.000Z"), // two months and two weeks before
    updatedAt: new Date("2023-02-16T12:34:56.000Z"),
  },
  {
    id: "c",
    zooverReviewId: 3,
    userName: "Test",
    title: "Test Review #3",
    text: "I am a test review.",
    status: ReviewStatus.APPROVED,
    generalScore: 0,
    scoreAspects: {
      room: 2,
      price_quality: 8,
    },
    createdAt: new Date("2021-05-16T12:34:56.000Z"), // twenty three months and two weeks before
    updatedAt: new Date("2021-05-16T12:34:56.000Z"),
  },
  {
    id: "d",
    zooverReviewId: 4,
    userName: "Test",
    title: "Test Review #4",
    text: "I am a test review.",
    status: ReviewStatus.APPROVED,
    generalScore: 0,
    scoreAspects: {
      room: 3,
      price_quality: 7,
    },
    createdAt: new Date("2021-01-16T12:34:56.000Z"), // twenty seven months and two weeks before
    updatedAt: new Date("2021-01-16T12:34:56.000Z"),
  },
];

// room = 0 + 1 * 

let referenceDate: Date;

describe('', () => {
  beforeAll(() => {
    referenceDate = new Date("2023-04-30T12:34:56.000Z");
  });

  test('calculates score aspect', () => {
    const expectedResult = (10 * Math.log(25) + 9 * Math.log(23) + 8 * Math.log(2) + 7 * WEIGHT_OLDER_THAN_TWO_YEARS) / 4;
    const calculatedResult = calculateWeightedScoreAspects(reviews, referenceDate);

    expect(calculatedResult.price_quality).toBeCloseTo(expectedResult, 5);
  });

  test('calculates score aspect with undefined value', () => {
    const expectedResult = (1 * Math.log(23) + 2 * Math.log(2) + 3 * WEIGHT_OLDER_THAN_TWO_YEARS) / 3;
    const calculatedResult = calculateWeightedScoreAspects(reviews, referenceDate);

    expect(calculatedResult.room).toBeCloseTo(expectedResult, 5);
  });

});

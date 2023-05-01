import { describe } from "node:test";
import { Review, ReviewStatus } from "../types/review";
import { calculateWeightedGeneralScore } from "./calculateWeightedGeneralScore";
import { compareNumbers } from "./compareNumbers";
import { beforeAll, expect, test } from "@jest/globals";

const reviews: Review[] = [
  {
    id: "a",
    zooverReviewId: 1,
    userName: "Test",
    title: "Test Review #1",
    text: "I am a test review.",
    status: ReviewStatus.APPROVED,
    generalScore: 2,
    scoreAspects: {},
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
    generalScore: 3,
    scoreAspects: {},
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
    generalScore: 4,
    scoreAspects: {},
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
    generalScore: 5,
    scoreAspects: {},
    createdAt: new Date("2021-01-16T12:34:56.000Z"), // twenty seven months and two weeks before
    updatedAt: new Date("2021-01-16T12:34:56.000Z"),
  },
];

let referenceDate: Date;

describe('calculateWeightedGeneralScore util', () => {
  beforeAll(() => {
    referenceDate = new Date("2023-04-30T12:34:56.000Z");
  });

  test('calculates correct weighted general score', () => {
    const calculatedWeightedGeneralScore = calculateWeightedGeneralScore(reviews, referenceDate);
    const expectedWeightedGeneralScore = (3.2189 * 2 + 3.1355 * 3 + 0.6932 * 4 + 0.57098 * 5) / 4;

    const passed = compareNumbers(expectedWeightedGeneralScore, calculatedWeightedGeneralScore);

    expect(passed);
  });
});


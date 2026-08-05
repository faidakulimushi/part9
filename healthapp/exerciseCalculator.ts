import { isNotNumber } from "./utils.ts";

interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

const calculateExercises = (
  dailyHours: number[],
  target: number
): Result => {
  const periodLength = dailyHours.length;

  const trainingDays = dailyHours.filter(day => day > 0).length;

  const average =
    dailyHours.reduce((sum, day) => sum + day, 0) / periodLength;

  const success = average >= target;

  let rating: number;
  let ratingDescription: string;

  if (average >= target) {
    rating = 3;
    ratingDescription = "great job";
  } else if (average >= target * 0.75) {
    rating = 2;
    ratingDescription = "not too bad but could be better";
  } else {
    rating = 1;
    ratingDescription = "you need to exercise more";
  }

  return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average
  };
};

try {
  if (process.argv.length < 4) {
    throw new Error("Please provide target and exercise hours.");
  }

  const values = process.argv.slice(2);

  if (values.some(isNotNumber)) {
    throw new Error("Provided values were not numbers!");
  }

  const target = Number(values[0]);
  const dailyHours = values.slice(1).map(Number);

  console.log(calculateExercises(dailyHours, target));
} catch (error: unknown) {
  let errorMessage = "Something went wrong.";

  if (error instanceof Error) {
    errorMessage += " " + error.message;
  }

  console.log(errorMessage);
}

export { calculateExercises };
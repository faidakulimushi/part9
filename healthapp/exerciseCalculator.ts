interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

export const calculateExercises = (
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

if (process.argv[1] === import.meta.filename) {
  try {
    if (process.argv.length < 4) {
      throw new Error("Please provide a target and exercise hours.");
    }

    const target = Number(process.argv[2]);
    const dailyHours = process.argv.slice(3).map(Number);

    console.log(calculateExercises(dailyHours, target));

  } catch (error: unknown) {
    let errorMessage = "Something went wrong.";

    if (error instanceof Error) {
      errorMessage += " " + error.message;
    }

    console.log(errorMessage);
  }
}
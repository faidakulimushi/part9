import { isNotNumber } from "./utils.ts";

const calculateBmi = (height: number, weight: number): string => {
  const bmi = weight / ((height / 100) * (height / 100));

  if (bmi < 18.5) {
    return "Underweight";
  } else if (bmi < 25) {
    return "Normal range";
  } else if (bmi < 30) {
    return "Overweight";
  } else {
    return "Obese";
  }
};

try {
  if (process.argv.length !== 4) {
    throw new Error("Please provide height and weight.");
  }

  const height = Number(process.argv[2]);
  const weight = Number(process.argv[3]);

  if (isNotNumber(process.argv[2]) || isNotNumber(process.argv[3])) {
    throw new Error("Provided values were not numbers!");
  }

  console.log(calculateBmi(height, weight));
} catch (error: unknown) {
  let errorMessage = "Something went wrong.";

  if (error instanceof Error) {
    errorMessage += " " + error.message;
  }

  console.log(errorMessage);
}

export { calculateBmi };
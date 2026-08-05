import express from "express";
import { calculateBmi } from "./bmiCalculator.ts";
import { calculateExercises } from "./exerciseCalculator.ts";
import { isNotNumber } from "./utils.ts";

const app = express();

app.use(express.json());

app.get("/ping", (_req, res) => {
  res.send("pong");
});

app.get("/hello", (_req, res) => {
  res.send("Hello Full Stack!");
});

app.get("/bmi", (req, res) => {
  const { height, weight } = req.query;

  if (
    typeof height !== "string" ||
    typeof weight !== "string" ||
    isNotNumber(height) ||
    isNotNumber(weight)
  ) {
    return res.status(400).json({
      error: "malformatted parameters"
    });
  }

  const bmi = calculateBmi(Number(height), Number(weight));

  return res.json({
    height: Number(height),
    weight: Number(weight),
    bmi
  });
});

app.post("/exercises", (req, res) => {

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { daily_exercises, target } = req.body;

  if (daily_exercises === undefined || target === undefined) {
    return res.status(400).json({
      error: "parameters missing"
    });
  }

  if (
    !Array.isArray(daily_exercises) ||
    isNotNumber(String(target)) ||
    daily_exercises.some((value: unknown) =>
      isNotNumber(String(value))
    )
  ) {
    return res.status(400).json({
      error: "malformatted parameters"
    });
  }

  const result = calculateExercises(
    daily_exercises.map(Number),
    Number(target)
  );

  return res.json(result);
});

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
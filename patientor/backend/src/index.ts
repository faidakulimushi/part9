import express, {
  type Request,
  type Response,
  type NextFunction,
} from "express";
import cors from "cors";
import { z } from "zod";
import patientService from "./services/patientService";
import {
  NewPatientSchema,
  type NewPatient,
} from "./types";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/api/ping", (_req, res) => {
  res.send("pong");
});

app.get("/api/patients", (_req, res) => {
  res.json(patientService.getNonSensitivePatients());
});

app.get("/api/patients/:id", (req, res) => {
  const patient = patientService.getPatientById(req.params.id);

  if (patient) {
    res.json(patient);
  } else {
    res.status(404).send({
      error: "Patient not found",
    });
  }
});

app.get("/api/diagnoses", (_req, res) => {
  res.json(patientService.getDiagnoses());
});

const newPatientParser = (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  try {
    NewPatientSchema.parse(req.body);
    next();
  } catch (error: unknown) {
    next(error);
  }
};

app.post(
  "/api/patients",
  newPatientParser,
  (req: Request<unknown, unknown, NewPatient>, res: Response) => {
    const newPatient = patientService.addPatient(req.body);
    res.json(newPatient);
  }
);

const errorMiddleware = (
  error: unknown,
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  if (error instanceof z.ZodError) {
    res.status(400).send({ error: error.issues });
  } else {
    next(error);
  }
};

app.use(errorMiddleware);

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
import { z } from "zod";

export const GenderValues = {
  Male: "male",
  Female: "female",
  Other: "other",
} as const;

export type Gender = typeof GenderValues[keyof typeof GenderValues];

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface Entry {
}

export interface Patient {
  id: string;
  name: string;
  occupation: string;
  gender: Gender;
  ssn: string;
  dateOfBirth: string;
  entries: Entry[];
}

export type NonSensitivePatient = Omit<Patient, "ssn" | "entries">;

export const NewPatientSchema = z.object({
  name: z.string(),
  occupation: z.string(),
  gender: z.enum(GenderValues),
  ssn: z.string(),
  dateOfBirth: z.string(),
});

export type NewPatient = z.infer<typeof NewPatientSchema>;
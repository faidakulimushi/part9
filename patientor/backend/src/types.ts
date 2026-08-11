 import { z } from "zod";

export const GenderValues = {
  Male: "male",
  Female: "female",
  Other: "other",
} as const;

export type Gender = typeof GenderValues[keyof typeof GenderValues];

export interface Patient {
  id: string;
  name: string;
  occupation: string;
  gender: Gender;
  ssn?: string;
  dateOfBirth?: string;
}

export type NonSensitivePatient = Omit<Patient, "ssn">;

export const NewPatientSchema = z.object({
  name: z.string(),
  occupation: z.string(),
  gender: z.enum(GenderValues),
  ssn: z.string().optional(),
  dateOfBirth: z.string().optional(),
});

export type NewPatient = z.infer<typeof NewPatientSchema>;
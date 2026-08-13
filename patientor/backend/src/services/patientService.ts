import {
  Patient,
  NonSensitivePatient,
  NewPatient,
  NewEntry,
  HealthCheckRating,
} from "../types";
import { v1 as uuid } from "uuid";

const patients: Patient[] = [
  {
    id: "1",
    name: "John Doe",
    occupation: "Engineer",
    gender: "male",
    ssn: "123-45-6789",
    dateOfBirth: "1990-01-01",
    entries: [
      {
        id: "entry-1",
        type: "HealthCheck",
        date: "2025-01-15",
        specialist: "Dr. Smith",
        description: "Annual health check. Patient is feeling well.",
        diagnosisCodes: ["M24.2"],
        healthCheckRating: HealthCheckRating.Healthy,
      },
      {
        id: "entry-2",
        type: "Hospital",
        date: "2025-02-10",
        specialist: "Dr. House",
        description: "Patient admitted for further examination.",
        diagnosisCodes: ["S03.5"],
        discharge: {
          date: "2025-02-15",
          criteria: "Patient has recovered and can return home.",
        },
      },
      {
        id: "entry-3",
        type: "OccupationalHealthcare",
        date: "2025-03-01",
        specialist: "Dr. Wilson",
        description: "Occupational health examination.",
        diagnosisCodes: ["J10.1"],
        employerName: "ABC Engineering Ltd",
        sickLeave: {
          startDate: "2025-03-02",
          endDate: "2025-03-07",
        },
      },
    ],
  },
  {
    id: "2",
    name: "Jane Smith",
    occupation: "Teacher",
    gender: "female",
    ssn: "987-65-4321",
    dateOfBirth: "1985-05-05",
    entries: [
      {
        id: "entry-4",
        type: "HealthCheck",
        date: "2025-04-12",
        specialist: "Dr. Adams",
        description: "Routine health check.",
        diagnosisCodes: ["M24.2"],
        healthCheckRating: HealthCheckRating.LowRisk,
      },
    ],
  },
];

const diagnoses = [
  {
    code: "S03.5",
    name: "Sprain of joints and ligaments of other and unspecified parts of head",
  },
  {
    code: "J10.1",
    name: "Influenza with other respiratory manifestations, other influenza virus code",
  },
  {
    code: "M24.2",
    name: "Disorder of ligament",
  },
];

const isString = (value: unknown): value is string =>
  typeof value === "string" && value.trim().length > 0;

const isGender = (param: unknown): param is Patient["gender"] =>
  typeof param === "string" &&
  ["male", "female", "other"].includes(param);

const parseStringField = (value: unknown, fieldName: string): string => {
  if (!isString(value)) {
    throw new Error(`Missing or invalid ${fieldName}`);
  }

  return value;
};

const parseGender = (gender: unknown): Patient["gender"] => {
  if (!isGender(gender)) {
    throw new Error("Missing or invalid gender");
  }

  return gender;
};

const toNewPatient = (object: unknown): NewPatient => {
  if (!object || typeof object !== "object") {
    throw new Error("Invalid patient data");
  }

  const entry = object as Record<string, unknown>;

  return {
    name: parseStringField(entry.name, "name"),
    dateOfBirth: parseStringField(entry.dateOfBirth, "dateOfBirth"),
    ssn: parseStringField(entry.ssn, "ssn"),
    gender: parseGender(entry.gender),
    occupation: parseStringField(entry.occupation, "occupation"),
  };
};

const getPatients = (): Patient[] => patients;

const getNonSensitivePatients = (): NonSensitivePatient[] => {
  return patients.map((patient) => ({
    id: patient.id,
    name: patient.name,
    occupation: patient.occupation,
    gender: patient.gender,
    dateOfBirth: patient.dateOfBirth,
  }));
};

const getPatientById = (id: string): Patient | undefined => {
  return patients.find((patient) => patient.id === id);
};

const getDiagnoses = () => diagnoses;

const addPatient = (patient: NewPatient): Patient => {
  const newPatientEntry = toNewPatient(patient);

  const newPatient: Patient = {
    id: uuid(),
    ...newPatientEntry,
    entries: [],
  };

  patients.push(newPatient);

  return newPatient;
};

const addEntry = (patientId: string, entry: NewEntry): Patient | undefined => {
  const patient = patients.find((patient) => patient.id === patientId);

  if (!patient) {
    return undefined;
  }

  const entryWithId = {
    ...entry,
    id: uuid(),
  };

  patient.entries.push(entryWithId);

  return patient;
};

export default {
  getPatients,
  getNonSensitivePatients,
  getPatientById,
  getDiagnoses,
  addPatient,
  addEntry,
};
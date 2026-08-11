import { Patient, NonSensitivePatient, NewPatient } from "../types";
import { v1 as uuid } from "uuid";

const patients: Patient[] = [
  {
    id: "1",
    name: "John Doe",
    occupation: "Engineer",
    gender: "male",
    ssn: "123-45-6789",
    dateOfBirth: "1990-01-01",
  },
  {
    id: "2",
    name: "Jane Smith",
    occupation: "Teacher",
    gender: "female",
    ssn: "987-65-4321",
    dateOfBirth: "1985-05-05", 
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
  return patients.map((patient) => {
    // disable unused variable warning for ssn because it is intentionally omitted
    // when returning non-sensitive patient data
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { ssn, ...nonSensitivePatient } = patient;
    return nonSensitivePatient;
  });
};

const getDiagnoses = () => diagnoses;

const addPatient = (patient: NewPatient): Patient => {
  const newPatientEntry = toNewPatient(patient);

  const newPatient: Patient = {
    id: uuid(),
    ...newPatientEntry,
  };

  patients.push(newPatient);

  return newPatient;
};

export default {
  getPatients, 
  getNonSensitivePatients,
  getDiagnoses,
  addPatient,
};
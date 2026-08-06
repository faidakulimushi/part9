import type { NonSensitivePatient, Patient } from '../types.js';

const patients: Patient[] = [
  {
    id: '1',
    name: 'John Doe',
    occupation: 'Engineer',
    gender: 'male',
    ssn: '123-45-6789',
    dateOfBirth: '1990-01-01',
  },
  {
    id: '2',
    name: 'Jane Smith',
    occupation: 'Teacher',
    gender: 'female',
    ssn: '987-65-4321',
    dateOfBirth: '1985-05-05',
  },
];

const diagnoses = [
  { code: 'S03.5', name: 'Sprain of joints and ligaments of other and unspecified parts of head' },
  { code: 'J10.1', name: 'Influenza with other respiratory manifestations, other influenza virus code' },
  { code: 'M24.2', name: 'Disorder of ligament' },
];

type NewPatient = Omit<Patient, 'id'>;

const isString = (value: unknown): value is string => typeof value === 'string' && value.trim().length > 0;

const isGender = (param: unknown): param is Patient['gender'] =>
  typeof param === 'string' && ['male', 'female', 'other'].includes(param);

const parseStringField = (value: unknown, fieldName: string): string => {
  if (!isString(value)) {
    throw new Error(`Missing or invalid ${fieldName}`);
  }
  return value;
};

const parseGender = (gender: unknown): Patient['gender'] => {
  if (!isGender(gender)) {
    throw new Error('Missing or invalid gender');
  }
  return gender;
};

const toNewPatient = (object: unknown): NewPatient => {
  if (!object || typeof object !== 'object') {
    throw new Error('Invalid patient data');
  }

  const entry = object as { [key: string]: unknown };

  return {
    name: parseStringField(entry.name, 'name'),
    dateOfBirth: parseStringField(entry.dateOfBirth, 'dateOfBirth'),
    ssn: parseStringField(entry.ssn, 'ssn'),
    gender: parseGender(entry.gender),
    occupation: parseStringField(entry.occupation, 'occupation'),
  };
};

const getPatients = (): Patient[] => patients;

const getNonSensitivePatients = (): NonSensitivePatient[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

const getDiagnoses = () => diagnoses;

const addPatient = (patient: unknown): Patient => {
  const newPatientEntry = toNewPatient(patient);
  const newPatient: Patient = {
    id: String(patients.length + 1),
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

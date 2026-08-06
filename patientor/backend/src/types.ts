export interface Patient {
  id: string;
  name: string;
  occupation: string;
  gender: 'male' | 'female' | 'other';
  ssn?: string;
  dateOfBirth?: string;
}

export type NonSensitivePatient = Omit<Patient, 'ssn'>;

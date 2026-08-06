import express from 'express';
import cors from 'cors';

const app = express();

app.use(cors());
app.use(express.json());

// simple in-memory patient list for frontend
type Patient = {
  id: string;
  name: string;
  occupation: string;
  gender: 'male' | 'female' | 'other';
  ssn?: string;
  dateOfBirth?: string;
};

const patients: Patient[] = [
  {
    id: '1',
    name: 'John Doe',
    occupation: 'Engineer',
    gender: 'male',
    ssn: '123-45-6789',
    dateOfBirth: '1990-01-01'
  },
  {
    id: '2',
    name: 'Jane Smith',
    occupation: 'Teacher',
    gender: 'female'
  }
];

app.get('/api/ping', (_req, res) => {
  res.send('pong');
});

app.get('/api/patients', (_req, res) => {
  res.json(patients);
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

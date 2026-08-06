import express from 'express';
import cors from 'cors';
import patientService from './services/patientService';

const app = express();

app.use(cors());
app.use(express.json());

app.get('/api/ping', (_req, res) => {
  res.send('pong');
});

app.get('/api/patients', (_req, res) => {
  res.json(patientService.getNonSensitivePatients());
});

app.get('/api/diagnoses', (_req, res) => {
  res.json(patientService.getDiagnoses());
});

app.post('/api/patients', (req, res) => {
  try {
    const newPatient = patientService.addPatient(req.body);
    res.json(newPatient);
  } catch (error) {
    if (error instanceof Error) {
      return res.status(400).json({ error: error.message });
    }
    return res.status(400).json({ error: 'Invalid request data' });
  }
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

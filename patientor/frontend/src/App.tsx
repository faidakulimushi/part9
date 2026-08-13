import { useState, useEffect } from "react";
import axios from "axios";
import {
  BrowserRouter as Router,
  Route,
  Link,
  Routes,
  useParams,
} from "react-router-dom";
import { Button, Divider, Container, Typography } from "@mui/material";

import { apiBaseUrl } from "./constants";
import {
  NonSensitivePatient,
  Patient,
  Diagnosis,
} from "./types";

import patientService from "./services/patients";
import PatientListPage from "./components/PatientListPage";

const PatientPage = ({
  diagnoses,
}: {
  diagnoses: Diagnosis[];
}) => {
  const { id } = useParams<{ id: string }>();
  const [patient, setPatient] = useState<Patient>();

  useEffect(() => {
    const fetchPatient = async () => {
      if (!id) {
        return;
      }

      const response = await axios.get<Patient>(
        `${apiBaseUrl}/patients/${id}`
      );

      setPatient(response.data);
    };

    void fetchPatient();
  }, [id]);

  if (!patient) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Typography variant="h4">
        {patient.name}{" "}
        {patient.gender === "female" ? "♀" : "♂"}
      </Typography>

      <Typography>
        ssn: {patient.ssn}
      </Typography>

      <Typography>
        occupation: {patient.occupation}
      </Typography>

      <Typography>
        date of birth: {patient.dateOfBirth}
      </Typography>

      <Typography variant="h5" sx={{ marginTop: "1em" }}>
        Entries
      </Typography>

      {patient.entries.length === 0 && (
        <Typography>No entries yet.</Typography>
      )}

      {patient.entries.map((entry) => (
        <div key={entry.id}>
          <Typography>
            {entry.date} <i>{entry.description}</i>
          </Typography>

          {entry.diagnosisCodes && (
            <ul>
              {entry.diagnosisCodes.map((code) => {
                const diagnosis = diagnoses.find(
                  (item) => item.code === code
                );

                return (
                  <li key={code}>
                    {code} {diagnosis ? diagnosis.name : ""}
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      ))}
    </div>
  );
};

const App = () => {
  const [patients, setPatients] = useState<NonSensitivePatient[]>([]);
  const [diagnoses, setDiagnoses] = useState<Diagnosis[]>([]);

  useEffect(() => {
    void axios.get<void>(`${apiBaseUrl}/ping`);

    const fetchPatientList = async () => {
      const patients = await patientService.getAll();
      setPatients(patients);
    };

    const fetchDiagnoses = async () => {
      const response = await axios.get<Diagnosis[]>(
        `${apiBaseUrl}/diagnoses`
      );

      setDiagnoses(response.data);
    };

    void fetchPatientList();
    void fetchDiagnoses();
  }, []);

  return (
    <div className="App">
      <Router>
        <Container>
          <Typography variant="h3" sx={{ marginBottom: "0.5em" }}>
            Patientor
          </Typography>

          <Button
            component={Link}
            to="/"
            variant="contained"
            color="primary"
          >
            Home
          </Button>

          <Divider sx={{ marginY: 2 }} />

          <Routes>
            <Route
              path="/"
              element={
                <PatientListPage
                  patients={patients}
                  setPatients={setPatients}
                />
              }
            />

            <Route
              path="/patients/:id"
              element={<PatientPage diagnoses={diagnoses} />}
            />
          </Routes>
        </Container>
      </Router>
    </div>
  );
};

export default App;
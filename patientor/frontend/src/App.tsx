import { useState, useEffect } from "react";
import axios from "axios";
import {
  BrowserRouter as Router,
  Route,
  Link,
  Routes,
  useParams,
} from "react-router-dom";
import {
  Button,
  Divider,
  Container,
  Typography,
} from "@mui/material";

import { apiBaseUrl } from "./constants";
import {
  NonSensitivePatient,
  Patient,
  Diagnosis,
} from "./types";

import patientService from "./services/patients";
import PatientListPage from "./components/PatientListPage";
import EntryDetails from "./components/EntryDetails";
import AddEntryModal from "./components/AddEntryModal";
import { NewHealthCheckEntryValues } from "./components/AddEntryForm";

const PatientPage = ({
  diagnoses,
}: {
  diagnoses: Diagnosis[];
}) => {
  const { id } = useParams<{ id: string }>();

  const [patient, setPatient] = useState<Patient>();
  const [modalOpen, setModalOpen] = useState(false);
  const [error, setError] = useState<string>();

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

  const openModal = () => {
    setModalOpen(true);
    setError(undefined);
  };

  const closeModal = () => {
    setModalOpen(false);
    setError(undefined);
  };

  const submitNewEntry = async (
    values: NewHealthCheckEntryValues
  ) => {
    if (!id) {
      return;
    }

    try {
      const response = await axios.post<Patient>(
        `${apiBaseUrl}/patients/${id}/entries`,
        values
      );

      setPatient(response.data);
      setModalOpen(false);
      setError(undefined);
    } catch (e: unknown) {
      console.error("Error adding entry:", e);

      if (axios.isAxiosError(e)) {
        console.error("Axios response:", e.response?.data);

        const data = e.response?.data;

        if (typeof data === "string") {
          setError(data);
        } else if (
          typeof data === "object" &&
          data !== null
        ) {
          if ("error" in data) {
            const error = data.error;

            if (Array.isArray(error)) {
              setError(
                error
                  .map((item) => {
                    if (
                      typeof item === "object" &&
                      item !== null &&
                      "message" in item
                    ) {
                      return String(item.message);
                    }

                    return JSON.stringify(item);
                  })
                  .join(", ")
              );
            } else if (typeof error === "string") {
              setError(error);
            } else {
              setError(JSON.stringify(error));
            }
          } else if ("message" in data) {
            setError(String(data.message));
          } else {
            setError(JSON.stringify(data));
          }
        } else {
          setError(
            "Something went wrong when adding the entry"
          );
        }
      } else if (e instanceof Error) {
        setError(e.message);
      } else {
        setError("Unknown error");
      }
    }
  };

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

      <Button
        variant="contained"
        onClick={openModal}
        sx={{ marginTop: 2 }}
      >
        Add Entry
      </Button>

      <Typography
        variant="h5"
        sx={{ marginTop: "1em" }}
      >
        Entries
      </Typography>

      {patient.entries.length === 0 && (
        <Typography>No entries yet.</Typography>
      )}

      {patient.entries.map((entry) => (
        <div
          key={entry.id}
          style={{
            border: "1px solid #ccc",
            padding: "1em",
            marginBottom: "1em",
          }}
        >
          <Typography>
            {entry.date} <i>{entry.description}</i>
          </Typography>

          <EntryDetails entry={entry} />

          {entry.diagnosisCodes && (
            <ul>
              {entry.diagnosisCodes.map((code) => {
                const diagnosis = diagnoses.find(
                  (item) => item.code === code
                );

                return (
                  <li key={code}>
                    {code}{" "}
                    {diagnosis ? diagnosis.name : ""}
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      ))}

      <AddEntryModal
        modalOpen={modalOpen}
        onClose={closeModal}
        onSubmit={submitNewEntry}
        error={error}
      />
    </div>
  );
};

const App = () => {
  const [patients, setPatients] = useState<
    NonSensitivePatient[]
  >([]);

  const [diagnoses, setDiagnoses] = useState<
    Diagnosis[]
  >([]);

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
          <Typography
            variant="h3"
            sx={{ marginBottom: "0.5em" }}
          >
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
              element={
                <PatientPage diagnoses={diagnoses} />
              }
            />
          </Routes>
        </Container>
      </Router>
    </div>
  );
};

export default App;
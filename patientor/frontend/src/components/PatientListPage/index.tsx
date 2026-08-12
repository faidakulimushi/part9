import { useState } from "react";
import {
  Box,
  Table,
  Button,
  TableHead,
  Typography,
  TableCell,
  TableRow,
  TableBody,
} from "@mui/material";
import axios from "axios";
import { Link } from "react-router-dom";

import { PatientFormValues, NonSensitivePatient } from "../../types";
import AddPatientModal from "../AddPatientModal";
import HealthRatingBar from "../HealthRatingBar";
import patientService from "../../services/patients";

interface Props {
  patients: NonSensitivePatient[];
  setPatients: React.Dispatch<React.SetStateAction<NonSensitivePatient[]>>;
}

const PatientListPage = ({ patients, setPatients }: Props) => {
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [error, setError] = useState<string>();

  const openModal = (): void => {
    setModalOpen(true);
  };

  const closeModal = (): void => {
    setModalOpen(false);
    setError(undefined);
  };

  const submitNewPatient = async (values: PatientFormValues) => {
    try {
      const patient = await patientService.create(values);

      const nonSensitivePatient: NonSensitivePatient = {
        id: patient.id,
        name: patient.name,
        occupation: patient.occupation,
        gender: patient.gender,
        dateOfBirth: patient.dateOfBirth,
      };

      setPatients((previousPatients) =>
        previousPatients.concat(nonSensitivePatient)
      );

      setModalOpen(false);
    } catch (e: unknown) {
      if (axios.isAxiosError(e)) {
        console.error("Axios error:", e.response?.data);

        if (e.response?.data) {
          const data = e.response.data;

          if (typeof data === "string") {
            setError(data);
          } else if (
            typeof data === "object" &&
            data !== null &&
            "error" in data
          ) {
            setError(String(data.error));
          } else {
            setError("Something went wrong when adding the patient");
          }
        } else {
          setError("Could not connect to the backend");
        }
      } else {
        console.error("Unknown error:", e);
        setError("Unknown error");
      }
    }
  };

  return (
    <div className="App">
      <Box>
        <Typography align="center" variant="h6">
          Patient list
        </Typography>
      </Box>

      <Table sx={{ marginBottom: "1em" }}>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Gender</TableCell>
            <TableCell>Occupation</TableCell>
            <TableCell>Health Rating</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {patients.map((patient) => (
            <TableRow key={patient.id}>
              <TableCell>
                <Button
                  component={Link}
                  to={`/patients/${patient.id}`}
                >
                  {patient.name}
                </Button>
              </TableCell>

              <TableCell>{patient.gender}</TableCell>

              <TableCell>{patient.occupation}</TableCell>

              <TableCell>
                <HealthRatingBar showText={false} rating={1} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <AddPatientModal
        modalOpen={modalOpen}
        onSubmit={submitNewPatient}
        error={error}
        onClose={closeModal}
      />

      <Button variant="contained" onClick={openModal}>
        Add New Patient
      </Button>
    </div>
  );
};

export default PatientListPage;
import { useState } from "react";
import { Button, TextField, Box } from "@mui/material";

export interface NewHealthCheckEntryValues {
  type: "HealthCheck";
  date: string;
  specialist: string;
  description: string;
  diagnosisCodes?: string[];
  healthCheckRating: number;
}

interface Props {
  onSubmit: (values: NewHealthCheckEntryValues) => void;
  onCancel: () => void;
}

const AddEntryForm = ({ onSubmit, onCancel }: Props) => {
  const [date, setDate] = useState("");
  const [specialist, setSpecialist] = useState("");
  const [description, setDescription] = useState("");
  const [diagnosisCodes, setDiagnosisCodes] = useState("");
  const [healthCheckRating, setHealthCheckRating] = useState("");

  const submit = (event: React.SyntheticEvent) => {
    event.preventDefault();

    const rating = Number(healthCheckRating);

    if (!date || !specialist || !description) {
      return;
    }

    if (!Number.isInteger(rating) || rating < 0 || rating > 3) {
      return;
    }

    const codes = diagnosisCodes
      .split(",")
      .map((code) => code.trim())
      .filter((code) => code.length > 0);

    onSubmit({
      type: "HealthCheck",
      date,
      specialist,
      description,
      diagnosisCodes:
        codes.length > 0 ? codes : undefined,
      healthCheckRating: rating,
    });
  };

  return (
    <Box component="form" onSubmit={submit}>
      <TextField
        fullWidth
        margin="normal"
        label="Date"
        placeholder="2026-08-13"
        value={date}
        onChange={({ target }) => setDate(target.value)}
      />

      <TextField
        fullWidth
        margin="normal"
        label="Specialist"
        value={specialist}
        onChange={({ target }) =>
          setSpecialist(target.value)
        }
      />

      <TextField
        fullWidth
        margin="normal"
        label="Description"
        value={description}
        onChange={({ target }) =>
          setDescription(target.value)
        }
      />

      <TextField
        fullWidth
        margin="normal"
        label="Diagnosis codes"
        placeholder="M24.2, S03.5"
        value={diagnosisCodes}
        onChange={({ target }) =>
          setDiagnosisCodes(target.value)
        }
      />

      <TextField
        fullWidth
        margin="normal"
        label="Health check rating (0-3)"
        type="number"
        inputProps={{
          min: 0,
          max: 3,
          step: 1,
        }}
        value={healthCheckRating}
        onChange={({ target }) =>
          setHealthCheckRating(target.value)
        }
      />

      <Box sx={{ marginTop: 2 }}>
        <Button type="submit" variant="contained">
          Add
        </Button>

        <Button
          type="button"
          variant="outlined"
          onClick={onCancel}
          sx={{ marginLeft: 1 }}
        >
          Cancel
        </Button>
      </Box>
    </Box>
  );
};

export default AddEntryForm;
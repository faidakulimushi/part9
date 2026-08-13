import { useState } from "react";
import {
  Button,
  TextField,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
} from "@mui/material";

export type EntryType =
  | "HealthCheck"
  | "OccupationalHealthcare"
  | "Hospital";

export interface NewEntryValues {
  type: EntryType;
  date: string;
  specialist: string;
  description: string;
  diagnosisCodes?: string[];

  healthCheckRating?: number;

  employerName?: string;

  sickLeave?: {
    startDate: string;
    endDate: string;
  };

  discharge?: {
    date: string;
    criteria: string;
  };
}

interface Props {
  onSubmit: (values: NewEntryValues) => void;
  onCancel: () => void;
}

const AddEntryForm = ({ onSubmit, onCancel }: Props) => {
  const [type, setType] =
    useState<EntryType>("HealthCheck");

  const [date, setDate] = useState("");
  const [specialist, setSpecialist] = useState("");
  const [description, setDescription] = useState("");
  const [diagnosisCodes, setDiagnosisCodes] = useState("");

  const [healthCheckRating, setHealthCheckRating] =
    useState("");

  const [employerName, setEmployerName] =
    useState("");

  const [sickLeaveStartDate, setSickLeaveStartDate] =
    useState("");

  const [sickLeaveEndDate, setSickLeaveEndDate] =
    useState("");

  const [dischargeDate, setDischargeDate] =
    useState("");

  const [dischargeCriteria, setDischargeCriteria] =
    useState("");

  const submit = (event: React.SyntheticEvent) => {
    event.preventDefault();

    const codes = diagnosisCodes
      .split(",")
      .map((code) => code.trim())
      .filter((code) => code.length > 0);

    const baseValues = {
      date,
      specialist,
      description,
      diagnosisCodes:
        codes.length > 0 ? codes : undefined,
    };

    if (type === "HealthCheck") {
      const rating = Number(healthCheckRating);

      if (
        !Number.isInteger(rating) ||
        rating < 0 ||
        rating > 3
      ) {
        return;
      }

      onSubmit({
        ...baseValues,
        type: "HealthCheck",
        healthCheckRating: rating,
      });

      return;
    }

    if (type === "OccupationalHealthcare") {
      onSubmit({
        ...baseValues,
        type: "OccupationalHealthcare",
        employerName,
        sickLeave:
          sickLeaveStartDate && sickLeaveEndDate
            ? {
                startDate: sickLeaveStartDate,
                endDate: sickLeaveEndDate,
              }
            : undefined,
      });

      return;
    }

    onSubmit({
      ...baseValues,
      type: "Hospital",
      discharge: {
        date: dischargeDate,
        criteria: dischargeCriteria,
      },
    });
  };

  return (
    <Box component="form" onSubmit={submit}>
      <FormControl fullWidth margin="normal">
        <InputLabel>Entry type</InputLabel>

        <Select
          value={type}
          label="Entry type"
          onChange={(event) =>
            setType(event.target.value as EntryType)
          }
        >
          <MenuItem value="HealthCheck">
            Health Check
          </MenuItem>

          <MenuItem value="OccupationalHealthcare">
            Occupational Healthcare
          </MenuItem>

          <MenuItem value="Hospital">
            Hospital
          </MenuItem>
        </Select>
      </FormControl>

      <TextField
        fullWidth
        margin="normal"
        label="Date"
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

      {type === "HealthCheck" && (
        <>
          <Typography
            variant="subtitle1"
            sx={{ marginTop: 2 }}
          >
            Health Check information
          </Typography>

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
        </>
      )}

      {type === "OccupationalHealthcare" && (
        <>
          <Typography
            variant="subtitle1"
            sx={{ marginTop: 2 }}
          >
            Occupational Healthcare information
          </Typography>

          <TextField
            fullWidth
            margin="normal"
            label="Employer name"
            value={employerName}
            onChange={({ target }) =>
              setEmployerName(target.value)
            }
          />

          <TextField
            fullWidth
            margin="normal"
            label="Sick leave start date"
            value={sickLeaveStartDate}
            onChange={({ target }) =>
              setSickLeaveStartDate(target.value)
            }
          />

          <TextField
            fullWidth
            margin="normal"
            label="Sick leave end date"
            value={sickLeaveEndDate}
            onChange={({ target }) =>
              setSickLeaveEndDate(target.value)
            }
          />
        </>
      )}

      {type === "Hospital" && (
        <>
          <Typography
            variant="subtitle1"
            sx={{ marginTop: 2 }}
          >
            Hospital information
          </Typography>

          <TextField
            fullWidth
            margin="normal"
            label="Discharge date"
            value={dischargeDate}
            onChange={({ target }) =>
              setDischargeDate(target.value)
            }
          />

          <TextField
            fullWidth
            margin="normal"
            label="Discharge criteria"
            value={dischargeCriteria}
            onChange={({ target }) =>
              setDischargeCriteria(target.value)
            }
          />
        </>
      )}

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
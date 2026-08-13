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

const HealthCheckEntryForm = ({ onSubmit, onCancel }: Props) => {
  const [date, setDate] = useState("");
  const [specialist, setSpecialist] = useState("");
  const [description, setDescription] = useState("");
  const [diagnosisCodes, setDiagnosisCodes] = useState("");
  const [healthCheckRating, setHealthCheckRating] = useState("");

  const [dateError, setDateError] = useState("");
  const [specialistError, setSpecialistError] = useState("");
  const [descriptionError, setDescriptionError] = useState("");
  const [diagnosisError, setDiagnosisError] = useState("");
  const [ratingError, setRatingError] = useState("");

  const validateDate = (value: string) => {
    if (!value) {
      return "Date is required";
    }

    const dateObject = new Date(value);

    if (Number.isNaN(dateObject.getTime())) {
      return "Date must be valid";
    }

    return "";
  };

  const validateSpecialist = (value: string) => {
    if (!value.trim()) {
      return "Specialist is required";
    }

    return "";
  };

  const validateDescription = (value: string) => {
    if (!value.trim()) {
      return "Description is required";
    }

    return "";
  };

  const validateDiagnosisCodes = (value: string) => {
    if (!value.trim()) {
      return "";
    }

    const codes = value
      .split(",")
      .map((code) => code.trim())
      .filter((code) => code.length > 0);

    const icd10Regex = /^[A-Z][0-9]{2}(\.[0-9A-Z]{1,4})?$/i;

    const invalidCodes = codes.filter(
      (code) => !icd10Regex.test(code)
    );

    if (invalidCodes.length > 0) {
      return `Invalid diagnosis code(s): ${invalidCodes.join(", ")}`;
    }

    return "";
  };

  const validateRating = (value: string) => {
    if (value === "") {
      return "Health check rating is required";
    }

    const rating = Number(value);

    if (!Number.isInteger(rating) || rating < 0 || rating > 3) {
      return "Health check rating must be between 0 and 3";
    }

    return "";
  };

  const submit = (event: React.FormEvent) => {
    event.preventDefault();

    const newDateError = validateDate(date);
    const newSpecialistError = validateSpecialist(specialist);
    const newDescriptionError = validateDescription(description);
    const newDiagnosisError = validateDiagnosisCodes(diagnosisCodes);
    const newRatingError = validateRating(healthCheckRating);

    setDateError(newDateError);
    setSpecialistError(newSpecialistError);
    setDescriptionError(newDescriptionError);
    setDiagnosisError(newDiagnosisError);
    setRatingError(newRatingError);

    if (
      newDateError ||
      newSpecialistError ||
      newDescriptionError ||
      newDiagnosisError ||
      newRatingError
    ) {
      return;
    }

    const codes = diagnosisCodes
      .split(",")
      .map((code) => code.trim())
      .filter((code) => code.length > 0);

    onSubmit({
      type: "HealthCheck",
      date,
      specialist: specialist.trim(),
      description: description.trim(),
      diagnosisCodes: codes,
      healthCheckRating: Number(healthCheckRating),
    });
  };

  return (
    <Box
      component="form"
      onSubmit={submit}
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
      }}
    >
      <TextField
        label="Date"
        type="date"
        value={date}
        onChange={(event) => {
          setDate(event.target.value);
          setDateError(validateDate(event.target.value));
        }}
        InputLabelProps={{
          shrink: true,
        }}
        error={Boolean(dateError)}
        helperText={dateError}
        required
      />

      <TextField
        label="Specialist"
        value={specialist}
        onChange={(event) => {
          setSpecialist(event.target.value);
          setSpecialistError(
            validateSpecialist(event.target.value)
          );
        }}
        error={Boolean(specialistError)}
        helperText={specialistError}
        required
      />

      <TextField
        label="Description"
        value={description}
        onChange={(event) => {
          setDescription(event.target.value);
          setDescriptionError(
            validateDescription(event.target.value)
          );
        }}
        error={Boolean(descriptionError)}
        helperText={descriptionError}
        required
        multiline
        rows={3}
      />

      <TextField
        label="Diagnosis codes"
        value={diagnosisCodes}
        onChange={(event) => {
          setDiagnosisCodes(event.target.value);
          setDiagnosisError(
            validateDiagnosisCodes(event.target.value)
          );
        }}
        error={Boolean(diagnosisError)}
        helperText={
          diagnosisError ||
          "Use valid ICD-10 codes separated by commas, e.g. J20.9, A00"
        }
      />

      <Typography variant="h6">
        Health Check information
      </Typography>

      <FormControl
        required
        error={Boolean(ratingError)}
      >
        <InputLabel id="health-check-rating-label">
          Health check rating (0-3)
        </InputLabel>

        <Select
          labelId="health-check-rating-label"
          value={healthCheckRating}
          label="Health check rating (0-3)"
          onChange={(event) => {
            const value = event.target.value;
            setHealthCheckRating(value);
            setRatingError(validateRating(value));
          }}
        >
          <MenuItem value={0}>0</MenuItem>
          <MenuItem value={1}>1</MenuItem>
          <MenuItem value={2}>2</MenuItem>
          <MenuItem value={3}>3</MenuItem>
        </Select>

        {ratingError && (
          <Typography
            color="error"
            variant="caption"
            sx={{ marginLeft: 2, marginTop: 0.5 }}
          >
            {ratingError}
          </Typography>
        )}
      </FormControl>

      <Box sx={{ display: "flex", gap: 1 }}>
        <Button
          variant="contained"
          type="submit"
        >
          ADD
        </Button>

        <Button
          variant="outlined"
          type="button"
          onClick={onCancel}
        >
          CANCEL
        </Button>
      </Box>
    </Box>
  );
};

export default HealthCheckEntryForm;
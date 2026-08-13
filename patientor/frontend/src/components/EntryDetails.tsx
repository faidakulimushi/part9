import {
  Entry,
  HealthCheckEntry,
  HospitalEntry,
  OccupationalHealthcareEntry,
} from "../types";

interface Props {
  entry: Entry;
}

const assertNever = (value: never): never => {
  throw new Error(`Unhandled entry type: ${JSON.stringify(value)}`);
};

const HealthCheckDetails = ({
  entry,
}: {
  entry: HealthCheckEntry;
}) => {
  return (
    <div>
      <p>health check rating: {entry.healthCheckRating}</p>
    </div>
  );
};

const HospitalDetails = ({
  entry,
}: {
  entry: HospitalEntry;
}) => {
  return (
    <div>
      <p>discharge date: {entry.discharge.date}</p>
      <p>discharge criteria: {entry.discharge.criteria}</p>
    </div>
  );
};

const OccupationalHealthcareDetails = ({
  entry,
}: {
  entry: OccupationalHealthcareEntry;
}) => {
  return (
    <div>
      <p>employer: {entry.employerName}</p>

      {entry.sickLeave && (
        <p>
          sick leave: {entry.sickLeave.startDate} -{" "}
          {entry.sickLeave.endDate}
        </p>
      )}
    </div>
  );
};

const EntryDetails = ({ entry }: Props) => {
  switch (entry.type) {
    case "HealthCheck":
      return <HealthCheckDetails entry={entry} />;

    case "Hospital":
      return <HospitalDetails entry={entry} />;

    case "OccupationalHealthcare":
      return <OccupationalHealthcareDetails entry={entry} />;

    default:
      return assertNever(entry);
  }
};

export default EntryDetails;
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Divider,
  Alert,
} from "@mui/material";

import AddEntryForm, {
  NewEntryValues,
} from "./AddEntryForm";

interface Props {
  modalOpen: boolean;
  onClose: () => void;
  onSubmit: (values: NewEntryValues) => void;
  error?: string;
}

const AddEntryModal = ({
  modalOpen,
  onClose,
  onSubmit,
  error,
}: Props) => (
  <Dialog
    fullWidth={true}
    open={modalOpen}
    onClose={onClose}
  >
    <DialogTitle>Add a new health check entry</DialogTitle>

    <Divider />

    <DialogContent>
      {error && (
        <Alert severity="error">
          {error}
        </Alert>
      )}

      <AddEntryForm
        onSubmit={onSubmit}
        onCancel={onClose}
      />
    </DialogContent>
  </Dialog>
);

export default AddEntryModal;
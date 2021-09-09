import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';

function Alert(props: AlertProps) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const SnackbarAlert = ({
  vertical,
  horizontal,
  open,
  onClose,
  autoHideDuration,
  severity,
  message,
}: {
  vertical: 'top' | 'bottom';
  horizontal: 'left' | 'center' | 'right';
  open: boolean;
  onClose: () => void;
  autoHideDuration: number;
  severity: 'success' | 'info' | 'warning' | 'error';
  message: string;
}) => {
  const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    onClose();
  };
  return (
    <div>
      <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        open={open}
        onClose={onClose}
        autoHideDuration={autoHideDuration}
      >
        <Alert onClose={handleClose} severity={severity}>
          {message}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default SnackbarAlert;

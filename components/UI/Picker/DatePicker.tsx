import { createStyles, makeStyles, Theme } from '@material-ui/core';
import { KeyboardDatePicker } from '@material-ui/pickers';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      display: 'flex',
      flexWrap: 'wrap',
      marginLeft: 10,
    },
  })
);

interface Props {
  name: string;
  label: string;
  value: Date | null;
  handleDateChange: (date: Date | null) => void;
}

export default function DatePicker({
  name,
  value,
  label,
  handleDateChange,
}: Props) {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <KeyboardDatePicker
        margin="normal"
        name={name}
        label={label}
        format="MM/dd/yyyy"
        value={value}
        onChange={handleDateChange}
        KeyboardButtonProps={{
          'aria-label': 'change date',
        }}
      />
    </div>
  );
}

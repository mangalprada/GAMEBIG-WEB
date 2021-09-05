import React, { ChangeEvent } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { KeyboardTimePicker } from '@material-ui/pickers';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      display: 'flex',
      flexWrap: 'wrap',
      marginLeft: 10,
    },
    textField: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      width: 200,
    },
  })
);

interface Props {
  name: string;
  label: string;
  value: Date | null;
  handleTimeChange: (date: Date | null) => void;
}

export default function TimePicker({
  name,
  value,
  label,
  handleTimeChange,
}: Props) {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <KeyboardTimePicker
        margin="normal"
        name={name}
        label={label}
        value={value}
        onChange={handleTimeChange}
        KeyboardButtonProps={{
          'aria-label': 'change time',
        }}
      />
    </div>
  );
}

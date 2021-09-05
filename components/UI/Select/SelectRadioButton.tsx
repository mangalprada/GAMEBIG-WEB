import { ChangeEvent } from 'react';
import {
  createStyles,
  FormControl,
  FormControlLabel,
  FormLabel,
  makeStyles,
  Radio,
  RadioGroup,
  Theme,
} from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      marginBlock: 15,
      marginLeft: 10,
    },
  })
);

interface Props {
  label: string;
  value: string;
  items: { id: string; name: string }[];
  handleChange: (event: ChangeEvent<{ value: unknown }>) => void;
}

export default function SelectRadioButton({
  label,
  value,
  handleChange,
  items,
}: Props) {
  const classes = useStyles();

  const listItems = items.map((item) => (
    <FormControlLabel
      key={item.id}
      value={item.id}
      control={<Radio />}
      label={item.name}
    />
  ));

  return (
    <div className={classes.root}>
      <FormControl component="fieldset">
        <FormLabel component="legend">{label}</FormLabel>
        <RadioGroup
          aria-label="mode"
          name="game-mode"
          value={value}
          onChange={handleChange}
        >
          {listItems}
        </RadioGroup>
      </FormControl>
    </div>
  );
}

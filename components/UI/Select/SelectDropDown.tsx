import { ChangeEvent } from 'react';
import {
  createStyles,
  FormControl,
  FormLabel,
  makeStyles,
  MenuItem,
  Select,
  Theme,
} from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      marginBlock: 15,
    },
    formControl: {
      margin: theme.spacing(1),
      minWidth: 160,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
  })
);

interface Props {
  name: string;
  label: string;
  value: string;
  menuItems: { id: string; name: string }[];
  handleChange: (event: ChangeEvent<{ value: unknown }>) => void;
}

export default function SelectDropDown({
  name,
  label,
  value,
  handleChange,
  menuItems,
}: Props) {
  const classes = useStyles();

  const listItems = menuItems.map((item: { id: string; name: string }) => (
    <MenuItem key={item.id} value={item.id}>
      {item.name}
    </MenuItem>
  ));
  return (
    <div className={classes.root}>
      <FormControl className={classes.formControl}>
        <FormLabel component="legend">{label}</FormLabel>
        <Select
          labelId="dropdown"
          id="games"
          name={name}
          value={value}
          onChange={handleChange}
          displayEmpty
          className={classes.selectEmpty}
        >
          {listItems}
        </Select>
      </FormControl>
    </div>
  );
}

import {
  createStyles,
  FormLabel,
  makeStyles,
  Slider,
  Theme,
} from '@material-ui/core';
import React from 'react';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      marginBlock: 15,
      marginLeft: 10,
      maxWidth: 300,
      paddingRight: 40,
    },
    sliderContainer: {
      marginTop: 45,
    },
  })
);

interface Props {
  value: number;
  onSlide: (event: any, newValue: number | number[]) => void;
}

const VALUES_LABEL = [
  {
    value: 2,
    label: '2',
  },
  {
    value: 25,
    label: '25',
  },
];

export default function SliderSelect({ value, onSlide }: Props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <FormLabel component="legend">Max Slots Available</FormLabel>
      <Slider
        defaultValue={10}
        aria-labelledby="continuous-slider"
        valueLabelDisplay="on"
        max={25}
        min={2}
        value={value}
        onChange={onSlide}
        marks={VALUES_LABEL}
        className={classes.sliderContainer}
      />
    </div>
  );
}

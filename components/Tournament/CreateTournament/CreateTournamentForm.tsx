import { ChangeEvent, useState } from 'react';
import {
  Button,
  Typography,
  createStyles,
  makeStyles,
  Theme,
  TextField,
  FormLabel,
} from '@material-ui/core';
import { ArrowBackIosRounded } from '@material-ui/icons';
import router from 'next/router';
import Aux from '../../../hoc/Auxiliary/Auxiliary';
import { GAMES } from '../../../assets/data/Games';
import { MODES, SCREAMS, TYPES } from '../../../assets/data/Utils';
import SelectDropDown from '../../UI/Select/SelectDropDown';
import SelectRadioButton from '../../UI/Select/SelectRadioButton';
import TimePicker from '../../UI/Picker/TimePicker';
import SliderSelect from '../../UI/Slider/SliderSelect';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      marginTop: 10,
      marginLeft: 20,
    },
    textBoxContainer: {
      marginBlock: 15,
      marginLeft: 8,
    },
    textBox: {
      minWidth: '90%',
      marginTop: 10,
    },
    buttonContainer: {
      display: 'flex',
      justifyContent: 'center',
      marginRight: 20,
    },
  })
);

export default function CreateTournamentForm() {
  const classes = useStyles();

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const [game, setGame] = useState('BGMI');
  const [mode, setMode] = useState('squad');
  const [type, setType] = useState('custom');
  const [scream, setScream] = useState('t3');
  const [value, setValue] = useState<number>(10);
  const [time, setTime] = useState<Date | null>(
    new Date('2014-08-18T21:11:54')
  );

  const handleChange = (event: ChangeEvent<{ value: unknown }>) => {
    setGame(event.target.value as string);
  };

  const onSelectMode = (event: ChangeEvent<{ value: unknown }>) => {
    setMode(event.target.value as string);
  };

  const onSelectType = (event: ChangeEvent<{ value: unknown }>) => {
    setType(event.target.value as string);
  };

  const onSelectScream = (event: ChangeEvent<{ value: unknown }>) => {
    setScream(event.target.value as string);
  };

  const handleTimeChange = (date: Date | null) => {
    setTime(date);
  };

  const onChangeSlider = (event: any, newValue: number | number[]) => {
    setValue(newValue as number);
  };

  return (
    <Aux>
      <Button
        color="primary"
        startIcon={<ArrowBackIosRounded color="primary" />}
        onClick={() => router.back()}
      >
        Go Back
      </Button>
      <div className={classes.root}>
        <Typography variant="h5" color="textSecondary">
          Create a Tournament / Custom
        </Typography>
        {/** Games */}
        <SelectDropDown
          label="Game Name"
          value={game}
          handleChange={handleChange}
          menuItems={GAMES}
        />
        {/** Modes */}
        <SelectRadioButton
          label="Game Mode"
          value={mode}
          handleChange={onSelectMode}
          items={MODES}
        />
        {/** Type */}
        <SelectRadioButton
          label="Match Type"
          value={type}
          handleChange={onSelectType}
          items={TYPES}
        />
        {/** Screams */}
        <SelectRadioButton
          label="Scream"
          value={scream}
          handleChange={onSelectScream}
          items={SCREAMS}
        />
        {/** Timing*/}
        <TimePicker
          value={time}
          label="Match Start Time"
          handleTimeChange={handleTimeChange}
        />
        {/** Slots */}
        <SliderSelect value={value} onSlide={onChangeSlider} />
        {/** Rules */}
        <div className={classes.textBoxContainer}>
          <FormLabel component="legend">Rules and Description</FormLabel>
          <TextField
            id="rules"
            multiline
            rows={4}
            placeholder="Describe your Rules and Point distribution here"
            variant="outlined"
            className={classes.textBox}
          />
        </div>
        {/** Prize*/}
        <div className={classes.textBoxContainer}>
          <FormLabel component="legend">
            Prize / Reward <em>&#40;optional&#41;</em>
          </FormLabel>
          <TextField
            id="prize"
            variant="outlined"
            placeholder="Prize money"
            className={classes.textBox}
          />
        </div>
        <div className={classes.buttonContainer}>
          <Button
            variant="contained"
            color="primary"
            type="submit"
            fullWidth={true}
            onClick={() => scrollToTop()}
          >
            Start Registration
          </Button>
        </div>
      </div>
    </Aux>
  );
}

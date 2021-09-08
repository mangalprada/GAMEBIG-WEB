import { useState } from 'react';
import router from 'next/router';
import { useFormik } from 'formik';
import {
  Button,
  Typography,
  createStyles,
  makeStyles,
  Theme,
  TextField,
  FormLabel,
  Backdrop,
  CircularProgress,
} from '@material-ui/core';
import { ArrowBackIosRounded } from '@material-ui/icons';
import Aux from '../../../hoc/Auxiliary/Auxiliary';
import { GAMES } from '../../../assets/data/Games';
import { MODES, SCREAMS, TYPES } from '../../../assets/data/Utils';
import SelectDropDown from '../../UI/Select/SelectDropDown';
import SelectRadioButton from '../../UI/Select/SelectRadioButton';
import TimePicker from '../../UI/Picker/TimePicker';
import SliderSelect from '../../UI/Slider/SliderSelect';
import { TournamentData } from '../../../utilities/tournament/types';
import { validationSchema } from '../../../utilities/tournament/validator';
import { addNewTournament } from '../../../lib/createTournament';
import { useAuth } from '../../../context/authContext';
import DatePicker from '../../UI/Picker/DatePicker';

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
    backdrop: {
      zIndex: theme.zIndex.drawer + 1,
      color: '#fff',
    },
  })
);

const INITIAL_STATE: TournamentData = {
  game: 'BGMI',
  mode: 'squad',
  type: 'custom',
  tier: 't3',
  noOfSlots: 10,
  startTime: new Date(),
  description: '',
  prize: '',
};

export default function CreateTournamentForm() {
  const { linkedOrgId } = useAuth();
  const classes = useStyles();
  const [isBackDropOpen, setIsBackDropOpen] = useState<boolean>(false);

  const formik = useFormik({
    initialValues: INITIAL_STATE,
    validationSchema: validationSchema,
    onSubmit: async (value: TournamentData, { resetForm }) => {
      console.log(value);
      setIsBackDropOpen(true);
      if (linkedOrgId) {
        const tournId = await addNewTournament(linkedOrgId, value);
        if (tournId) {
          router.push(`/organization/${linkedOrgId}/tournaments`);
        } else {
          router.push('/404');
        }
      }
      setIsBackDropOpen(false);
      resetForm();
    },
  });

  return (
    <Aux>
      <Button
        color="primary"
        startIcon={<ArrowBackIosRounded color="primary" />}
        onClick={() => router.back()}
      >
        Go Back
      </Button>
      <form onSubmit={formik.handleSubmit} className={classes.root}>
        <Typography variant="h5" color="textSecondary">
          Create a Tournament / Custom
        </Typography>
        {/** Games */}
        <SelectDropDown
          label="Game Name"
          name="game"
          value={formik.values.game}
          handleChange={formik.handleChange}
          menuItems={GAMES}
        />
        {/** Modes */}
        <SelectRadioButton
          label="Game Mode"
          name="mode"
          value={formik.values.mode}
          handleChange={formik.handleChange}
          items={MODES}
        />
        {/** Type */}
        <SelectRadioButton
          label="Match Type"
          name="type"
          value={formik.values.type}
          handleChange={formik.handleChange}
          items={TYPES}
        />
        {/** Screams */}
        <SelectRadioButton
          label="Scream"
          name="tier"
          value={formik.values.tier}
          handleChange={formik.handleChange}
          items={SCREAMS}
        />
        {/** Timing*/}
        <DatePicker
          name="startDate"
          value={formik.values.startTime}
          label="Match Date"
          handleDateChange={(date) => formik.setFieldValue('startTime', date)}
        />
        <TimePicker
          name="startTime"
          value={formik.values.startTime}
          label="Match Start Time"
          handleTimeChange={(date) => formik.setFieldValue('startTime', date)}
        />
        {/** Slots */}
        <SliderSelect
          name="noOfSlots"
          value={formik.values.noOfSlots}
          onSlide={(event, value) => formik.setFieldValue('noOfSlots', value)}
        />
        {/** Rules */}
        <div className={classes.textBoxContainer}>
          <FormLabel component="legend">Rules and Description</FormLabel>
          <TextField
            id="description"
            multiline
            rows={4}
            placeholder="Describe your Rules and Point distribution here"
            variant="outlined"
            value={formik.values.description}
            onChange={formik.handleChange}
            error={
              formik.touched.description && Boolean(formik.errors.description)
            }
            helperText={formik.touched.description && formik.errors.description}
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
            value={formik.values.prize}
            onChange={formik.handleChange}
          />
        </div>
        <div className={classes.buttonContainer}>
          <Button
            variant="contained"
            color="primary"
            type="submit"
            fullWidth={true}
          >
            Start Registration
          </Button>
        </div>
        <Backdrop className={classes.backdrop} open={isBackDropOpen}>
          <CircularProgress color="inherit" />
        </Backdrop>
      </form>
    </Aux>
  );
}

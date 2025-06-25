import React from 'react';
import { Grid } from '@mui/material';
import Show from './Show';
import Load from './Load';
import Add from './Add';
import Confirm from './Confirm';
import useMealsItemMode from '../../hooks/useMealsItemMode';

//componet rendered for each day - varies depending on the mode state
export default function DayMealsItem(props) {

  const { meal, mealType, dayOfWeek, removeMeal } = props;

  //appointment pannel mode name variables
  const ADD = "ADD";
  const SHOW = "SHOW";
  const CONFIRM = "CONFIRM";
  const LOAD = "LOAD";

  //hook to handle changing from one mode to another
  const { mode, transition, back } = useMealsItemMode(ADD);

  //If a meal is available transition to the show mode
  if (mode === ADD && meal) {
    transition(SHOW);
  }

  //when a user confirms the remove action
  const onConfirm = () => {
    transition(LOAD);
    removeMeal(mealType, dayOfWeek)
      .then(() => {
        //after a meal is removed, transition back to empty "add" state
        transition(ADD);
      });
  };

  //conditionally render different components depending on the state of mode
  return (
    <Grid container justifyContent="center">

      {mode === SHOW && (
        <Show sx={{ maxWidth: 500 }}
          meal={meal}
          mealType={mealType}
          onRemove={() => {
            return transition(CONFIRM)
          }}
          dayOfWeek={dayOfWeek}
        />
      )}
      {mode === ADD && (
        <Add
          mealType={mealType}
          dayOfWeek={dayOfWeek}
        />)
      }
      {mode === CONFIRM && (
        <Confirm
          onConfirm={onConfirm}
          onCancel={() => back()}
        />)}
      {mode === LOAD && <Load />}

    </Grid>
  );
};
import React from 'react';
import { Grid, Typography } from '@mui/material';
import DayMealsItem from './DayMealsItem'
import { DayMealItemPaper } from '../../customstyles/DayMealItemPaper';

//component rendered for each day of the week, maps through daily meals and renders
//the meal item subcomponent
export default function DayMeals(props) {
  
  const mealTypes = ["breakfast", "lunch", "dinner"];
  const { meals, dayOfWeek, removeMeal } = props;

  //refactor could migrate in-line prop styling to styled components format for more modularity
  return (
    <Grid sx={{ paddingBottom: "20px" }}>
      <Grid>
        <Typography sx={{ textTransform: "capitalize", fontWeight: 'bold', fontSize: "30px", float: "left", marginLeft: "15px", marginTop: "15px" }} align="center" variant="h4" component="div">
          {dayOfWeek}
        </Typography>
      </Grid>
      <Grid marginTop={0} container spacing={2} columns={3} wrap={"nowrap"}>
        {
          mealTypes.map((mealType) => {
            return (
              <Grid key={mealType} item xs={4}>
                <DayMealItemPaper>
                  <DayMealsItem
                    dayOfWeek={dayOfWeek}
                    meal={meals[mealType]}
                    mealType={mealType}
                    removeMeal={removeMeal}
                  />
                </DayMealItemPaper>
              </Grid>
            );
          })
        }
      </Grid>
    </Grid >
  );

};
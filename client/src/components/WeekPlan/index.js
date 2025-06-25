import { Stack } from '@mui/material';
import DayMeals from './DayMeals';
import useWeeklyPlanData from '../../hooks/useWeeklyPlanData';
import myWeekIcon from '../images//myweek.png'

//parent component of the meal plan page - map through days of week and render child components
//for each day
export default function WeekPlan() {

  const { plan, removeMeal } = useWeeklyPlanData();

  const daysOfWeek = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday']
  return (
    <>
      <header class="mainPageHeaders"><img className="headerIcon" src={myWeekIcon} />My Week</header>
      <Stack>
        {daysOfWeek.map((day) => {
          return (
            <DayMeals
              key={day}
              meals={plan[day] ? plan[day] : {}}
              dayOfWeek={day}
              removeMeal={removeMeal}
            />
          )
        })}
      </Stack>
    </>
  );
};
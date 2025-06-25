import { useState, useEffect, useContext } from 'react'
import { mealContext } from '../providers/MealProvider'
import axios from 'axios';

//hook to fetch the users meals for a given week and handle deletions
export default function useWeeklyPlanData() {

  //meal context keeps track of what the present week being rendered is
  const { weekNumber } = useContext( mealContext )
  const [plan, setPlan] = useState({})

  //make a database call every time the page renders
  useEffect(() => {
    axios.get(`/api/recipes/mealList/${weekNumber}`)
      .then((response) => {
        console.log(response.data)
        setPlan((prev) => (
          {
            ...prev, 
            ...response.data
          }
        ))
      })
      .catch((err) => {
        console.log(err.message);
      })
  }, []);

  //remove the meal from the database
  const removeMeal = (meal, day) => {
    return axios.delete(`/api/recipes`, {
      data: {
        week: 1,
        meal,
        day
      }
    })
    .then(() => {
      // remove the meal from the plan object and set the state of the plan
      let updateObject = {...plan}
      delete updateObject[day][meal];
      setPlan(() => (updateObject));
      
    })
    .catch((e)=>{
      console.log(e);
    });
  }

  return { plan, removeMeal };
};
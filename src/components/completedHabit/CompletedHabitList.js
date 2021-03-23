import React, { useContext, useEffect, useState } from "react"
import { HabitContext } from "../habit/HabitProvider"
import { CompletedHabitCard } from "./CompletedHabitCard"
import "../habit/Habit.css"
import { useHistory } from "react-router-dom"
import { Button, Grid, ButtonGroup } from "@material-ui/core"
import Typography from '@material-ui/core/Typography';
import GridList from '@material-ui/core/GridList';

export const CompletedHabitList = () => {
  const { habits, getHabitsById} = useContext(HabitContext)

  // Since you are no longer ALWAYS displaying all of the articles
  const [ filteredHabits, setFiltered ] = useState([])
  const history = useHistory()

  // Empty dependency array - useEffect only runs after first render
  useEffect(() => {
      getHabitsById()
  }, [])

  // useEffect dependency array with dependencies - will run if dependency changes (state)
  useEffect(() => {
    const sortedHabits = habits.sort((a, b) => b.time - a.time)

    setFiltered(sortedHabits)
  }, [habits])

  return (
    <>
      <Grid container display="flex">
        <Typography variant="h3" justify-content="flex-start">Completed Habits</Typography>

        <Grid item justify-content="flex-end" flex-direction="row-reverse">
          <ButtonGroup orientation="vertical" aria-label="vertical button group">
              <Button variant="outlined" className="toDoButton" color="secondary" xs={6} onClick={() => history.push("/habits")}>To Do</Button>
              <Button variant="contained" className="completedButton" color="secondary" xs={6}>Completed Habits</Button>
          </ButtonGroup>
        </Grid>
      </Grid>


    <GridList cellHeight={50} cols={1} display="flex" flexWra="wrap">
      <div className="habits">
      {
        filteredHabits.map(habit => {
            if(habit.completed === true) {

            
                return (
                <CompletedHabitCard key={habit.id} habit={habit} />
                )
            }
        })
      }
      </div>
      </GridList>
    </>
  )
}
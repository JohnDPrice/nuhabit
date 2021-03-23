import React, { useContext, useEffect, useState } from "react"
import { HabitContext } from "./HabitProvider"
import { HabitCard } from "./HabitCard"
import "./Habit.css"
import { useHistory } from "react-router-dom"
import { Button, ButtonGroup, Grid, Tooltip } from "@material-ui/core"
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import Typography from '@material-ui/core/Typography';

export const HabitList = () => {
  
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
    <div className="list-container">
    <Grid container direction="row">
      <Grid item justify="flex-start">
        <Typography variant="h2" display="inline">Habits</Typography>
      </Grid>

      <Grid item alignItems="flex-end">
        <ButtonGroup orientation="vertical" aria-label="vertical button group">
            <Button variant="contained" className="toDoButton" color="secondary" xs={6}>To Do</Button>
            <Button variant="outlined" className="completedButton" color="secondary" xs={6} onClick={() => history.push("/completed-habits")}>Completed Habits</Button>
        </ButtonGroup>
        </Grid>
    </Grid>

    <Grid container direction="row" justify="center" xs={12}>
      <Grid item>
        <div className="addHabitContainer" container justify="center">
          <Tooltip title="Add a new habit">
            <Fab color="secondary">
              <AddIcon style={{ fontSize: 40 }} className="addHabit" onClick={() => history.push("/habits/create")} /> 
            </Fab>
          </Tooltip>
        </div>
      </Grid>
    </Grid>

      <div className="habits">
      {
        filteredHabits.map(habit => {
          if(habit.completed === false) {

          return (
          <HabitCard key={habit.id} habit={habit} />
          )
          }
        })
      }
      </div>
    </div>
  )
}
import React, { useContext, useEffect, useState } from "react"
import { HabitContext } from "./HabitProvider"
import { HabitCard } from "./HabitCard"
import "./Habit.css"
import { useHistory } from "react-router-dom"
import { Button, ButtonGroup, Grid, Tooltip } from "@material-ui/core"
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { HabitForm } from './HabitForm'

export const HabitList = () => {
  
  const { habits, getHabitsById } = useContext(HabitContext)
  const [ openPopup, setOpenPopup ] = useState(false)

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
    <div className="habitListContainer">
      <Box mt="3em" mx="5em">
          <Grid container direction="row" justify="space-between">
            <Grid item justify="flex-start">
              <Typography variant="h2" display="inline">Habits</Typography>
            </Grid>

            <Grid item>
                <Tooltip title="Add a new habit">
                  <Fab color="secondary">
                    <AddIcon style={{ fontSize: 40 }} className="addHabit" onClick={() => setOpenPopup(true)} /> 
                  </Fab>
                </Tooltip>
            </Grid>

            <Grid item alignItems="flex-end">
                <ButtonGroup orientation="vertical" aria-label="vertical button group">
                <Button variant="contained" className="toDoButton" color="secondary">To Do</Button>
                <Button variant="outlined" className="completedButton" color="secondary" onClick={() => history.push("/completed-habits")}>Completed Habits</Button>
              </ButtonGroup>
            </Grid>
            </Grid>
          </Box>

        <Box mt="2em" mx="4em">
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
        </Box>
        <HabitForm
        title = "Habit Form"
        openPopup = {openPopup} 
        setOpenPopup = {setOpenPopup}
        />
    </div>
  )
}
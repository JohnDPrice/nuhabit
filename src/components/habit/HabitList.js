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
import Chip from '@material-ui/core/Chip';
import LinearProgress from '@material-ui/core/LinearProgress';

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

    let completedPhysicalHabits = []
    let completedMentalHabits = []
    let completedProductivityHabits = []

    const habitCategoryTags = (categoryArray) => {

      filteredHabits.map(habit => {

        if(habit.completed === true && habit.habitCategoryId === 1){
          completedPhysicalHabits.push(habit)
        } else if(habit.completed === true && habit.habitCategoryId === 2){
          completedMentalHabits.push(habit)
        } else if(habit.completed === true && habit.habitCategoryId === 3){
          completedProductivityHabits.push(habit)
        }
      })

      if(categoryArray.length < 21){
        return(
          <Chip label="Beginner" />
        )
      } else if(categoryArray.length >= 21 && categoryArray.length < 42){
        return (
          <Chip label="Intermediate" />
        )
      } else if(categoryArray.length >= 42){
        return (
          <Chip label="Expert" />
        )
      }
    }


  return (
    <div className="habitListContainer">
      <Box pt="3em" pb="3em" px="5em" style={{backgroundColor:"#f2f2f2"}}>
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

          <Box mt="2em">
            <Grid container justify="center">
            <div className="physicalHabits">
              <Grid item>
                <Box>
                  <Box display="flex" justifyContent="center" mt="1em">
                    <Typography variant="h4">Physical</Typography>
                  </Box>
                  <Box display="flex" justifyContent="center">
                    {habitCategoryTags(completedPhysicalHabits)}
                  </Box>
                  {
                    filteredHabits.map(habit => {
                      if(habit.completed === false && habit.habitCategoryId === 1) {

                        return (
                          <div>
                            <Box mt="1em">
                            <HabitCard key={habit.id} habit={habit} />
                            </Box>
                          </div>
                        )
                      }
                    })
                  }
                </Box>
              </Grid>
            </div>
            <div className="mentalHabits">
              <Grid item>
                <Box>
                  <Box display="flex" justifyContent="center" mt="1em">
                    <Typography variant="h4">Mental</Typography>
                  </Box>
                  <Box display="flex" justifyContent="center">
                    {habitCategoryTags(completedMentalHabits)}
                  </Box>
                  {
                    filteredHabits.map(habit => {
                      if(habit.completed === false && habit.habitCategoryId === 2) {

                        return (
                          <div>
                            <Box mt="1em">
                              <HabitCard key={habit.id} habit={habit} />
                            </Box>
                          </div>
                        )
                      } 
                    })
                  }
                </Box>
              </Grid>
            </div>
            <div className="selfDevelopmentHabits">
              <Grid item justifyContent="center">
                <Box display="flex" justifyContent="center" mt="1em">
                  <Typography variant="h4">Productivity</Typography>
                </Box>
                <Box display="flex" justifyContent="center">
                  {habitCategoryTags(completedProductivityHabits)}
                </Box>
              {
                filteredHabits.map(habit => {
                  if(habit.completed === false && habit.habitCategoryId === 3) {

                    return (
                      <div>
                        <Box mt="1em">
                          <HabitCard key={habit.id} habit={habit} />
                        </Box>
                      </div>
                    )
                  } 
                })
              }
              </Grid>
            </div>
            </Grid>
          </Box>

          <HabitForm
          title = "Habit Form"
          openPopup = {openPopup} 
          setOpenPopup = {setOpenPopup}
          />

    </div>
  )
}
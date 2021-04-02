import React, { useContext, useEffect, useState } from "react"
import { HabitContext } from "../habit/HabitProvider"
import { CompletedHabitCard } from "./CompletedHabitCard"
import "../habit/Habit.css"
import { useHistory } from "react-router-dom"
import { Button, Grid, ButtonGroup } from "@material-ui/core"
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

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
        <Box pt="3em" pb="3em" px="5em" style={{backgroundColor:"#f2f2f2"}}>
            <Grid container direction="row" justify="space-between">
                <Typography variant="h3">Completed Habits</Typography>

                <Grid item>
                  <ButtonGroup orientation="vertical" aria-label="vertical button group">
                      <Button variant="outlined" className="toDoButton" color="secondary" xs={6} onClick={() => history.push("/habits")}>To Do</Button>
                      <Button variant="contained" className="completedButton" color="secondary" xs={6}>Completed Habits</Button>
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
                  {
                    filteredHabits.map(habit => {
                      if(habit.completed === true && habit.habitCategoryId === 1) {

                        return (
                          <div>
                            <Box mt="1em">
                            <CompletedHabitCard key={habit.id} habit={habit} />
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
                  {
                    filteredHabits.map(habit => {
                      if(habit.completed === true && habit.habitCategoryId === 2) {

                        return (
                          <div>
                            <Box mt="1em">
                              <CompletedHabitCard key={habit.id} habit={habit} />
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
              {
                filteredHabits.map(habit => {
                  if(habit.completed === true && habit.habitCategoryId === 3) {

                    return (
                      <div>
                        <Box mt="1em">
                          <CompletedHabitCard key={habit.id} habit={habit} />
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


    </>
  )
}
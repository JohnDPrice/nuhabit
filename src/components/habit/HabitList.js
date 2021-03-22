import React, { useContext, useEffect, useState } from "react"
import { HabitContext } from "./HabitProvider"
import { HabitCard } from "./HabitCard"
import "./Habit.css"
import { useHistory } from "react-router-dom"
import { Button } from "@material-ui/core"

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

      <h1>Habits</h1>

      <Button className="addHabit" variant="contained" color="primary" onClick={() => history.push("/habits/create")}>
          Add New Habit
      </Button>
      <div className="habits">
      {
        filteredHabits.map(habit => {
          return (
          <HabitCard key={habit.id} habit={habit} />
          )
        })
      }
      </div>
    </div>
  )
}
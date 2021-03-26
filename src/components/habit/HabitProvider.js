import React, { useState, createContext } from "react"

// The context is imported and used by individual components that need data. A context stores a certain kind of data to be used in your application. Therefore, when you create a dta provider component in React you need to create a context. Nothing is stored in the context when it's defined. At this point, it's just an empty warehouse waiting to be filled.
export const HabitContext = createContext()

// This component establishes what data can be used
export const HabitProvider = (props) => {
    const [habits, setHabits] = useState([])
    const [ searchTerms, setSearchTerms ] = useState("")

    const getHabits = () => {
        return fetch("http://localhost:8088/habits/")
        .then(res => res.json())
        .then(setHabits)
    }

    const addHabit = habitObj => {
        return fetch("http://localhost:8088/habits", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(habitObj)
        })
        .then(response => response.json())
        .then(getHabitsById)
    }

    const userId = localStorage.getItem("nuhabit_user")

    const getHabitsById = () => {
        return fetch(`http://localhost:8088/habits?userId=${userId}`)
            .then(res => res.json())
            .then(setHabits)
    }

    const getHabitById = (id) => {
        return fetch(`http://localhost:8088/habits/${id}`)
            .then(res => res.json())
    }

    const releaseHabit = habitId => {
        return fetch(`http://localhost:8088/habits/${habitId}`, {
            method: "DELETE"
        })
            .then(getHabitsById)
    }

    const completeHabit = habitId => {
        return fetch(`http://localhost:8088/habits/${habitId}`, {
            method: "PATCH",
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                completed: true
            })        
        })
        .then(getHabits)
    }

    const uncompleteHabit = habitId => {
        return fetch(`http://localhost:8088/habits/${habitId}`, {
            method: "PATCH",
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                completed: false
            })        
        })
        .then(getHabits)
    }

    const completedHabitDate = habitId => {
        return fetch(`http://localhost:8088/habits/${habitId}`, {
            method: "PATCH",
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                completedDate: new Date()
            })        
        })
        .then(getHabits)
    }

    const updateHabit = habit => {
        return fetch(`http://localhost:8088/habits/${habit.id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(habit)
        })
          .then(getHabits)
      }

        // You return a context provider which has the 'animals' state, 'getAnimals' function, anmd the 'addAnimal' function as keys. This allows any child elements to access them.
        return (
            <HabitContext.Provider value={{
                habits, getHabits, addHabit, getHabitsById, getHabitById, releaseHabit, completeHabit, uncompleteHabit, completedHabitDate, updateHabit, searchTerms, setSearchTerms
            }}>
                {props.children}
            </HabitContext.Provider>
        )
}
import React, { useState, createContext } from "react"

export const HabitCategoryContext = createContext()

export const HabitCategoryProvider = (props) => {

const [habitCategories, setHabitCategories] = useState([])

const getHabitCategories = () => {
    return fetch("http://localhost:8088/habitCategories")
    .then(res => res.json())
    .then(setHabitCategories)
}

return (
    <HabitCategoryContext.Provider value={{
        habitCategories, getHabitCategories
    }}>
        {props.children}
    </HabitCategoryContext.Provider>
)

}
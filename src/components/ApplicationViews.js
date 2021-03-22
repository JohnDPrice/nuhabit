import { Route } from "react-router-dom";
import React from "react";
import { HabitProvider } from "./habit/HabitProvider";
import { HabitCategoryProvider } from "./habitCategory/CategoryProvider"
import { HabitForm } from "./habit/HabitForm"
import { HabitList } from "./habit/HabitList"
import { CompletedHabitList } from "./completedHabit/CompletedHabitList";


export const ApplicationViews = () => {

    return (
        <>
            <HabitProvider>
                <HabitCategoryProvider>
                    <Route exact path="/habits">
                        <HabitList />
                    </Route>
                    <Route exact path="/habits/create">
                        <HabitForm />
                    </Route>
                    <Route path="/habits/edit/:habitId(\d+)">
                        <HabitForm />
                    </Route>
                    <Route exact path="/completed-habits">
                        <CompletedHabitList />
                    </Route>
                </HabitCategoryProvider>
            </HabitProvider>   
        </>

      
    );
}
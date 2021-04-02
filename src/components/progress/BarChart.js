import React, { useContext, useEffect, useState } from 'react'
import { Bar } from 'react-chartjs-2'
import { HabitContext } from '../habit/HabitProvider'
import Box from '@material-ui/core/Box';

export const BarChart = () => {

    const { habits, getHabitsById } = useContext(HabitContext)
    const [ dataChart, setDataChart ] = useState({})

    useEffect(() => {
        getHabitsById()
}, [])

let run = () => {
        let fitnessHabits = []
        let dietHabits = []
        let selfDevelopmentHabits = []

        habits.forEach(habit => {
            if(habit.habitCategoryId === 1 && habit.completed === true) {
                fitnessHabits.push(habit)
                
            } else if(habit.habitCategoryId === 2 && habit.completed === true) {
                
                selfDevelopmentHabits.push(habit)
            } else if(habit.habitCategoryId === 3 && habit.completed === true) {
                dietHabits.push(habit)
            }

            let totals  = [fitnessHabits.length, selfDevelopmentHabits.length, dietHabits.length]

            setDataChart({
                labels: ['Physical', 'Mental', 'Productivity'],
                datasets: [{
                    label:'Total Habits Completed By Category',
                    data: totals,
                    backgroundColor: ['#ff5400', '#ff5400', '#ff5400']
                }],
            })
        })
}

useEffect(() => {
    run()
}, [habits])

    return (
        <div className="barChartContainer">
            <Box mt="3em" mx="5em">
                <Bar
                data={dataChart}
                height={500}
                width={600}
                options={{
                    maintainAspectRatio: false,
                    scales: {
                        yAxes: [{
                            ticks: {
                                beginAtZero: true,
                            }
                        }]
                    }
                }}
                />
            </Box>
        </div>
    )
}
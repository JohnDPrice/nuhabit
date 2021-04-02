import React, { useContext, useEffect, useState } from 'react'
import { Line } from 'react-chartjs-2'
import { HabitContext } from '../habit/HabitProvider'
import Box from '@material-ui/core/Box';

export const LineChart = () => {

    const { habits, getHabitsById } = useContext(HabitContext)
    const [ dataChart, setDataChart ] = useState({})

    useEffect(() => {
        getHabitsById()
}, [])

let run = () => {

        let completedHabits = []
        let dateOfCompletion = []
        let monday = []
        let tuesday = []
        let wednesday = []
        let thursday = []
        let friday = []
        let saturday = []
        let sunday = []

        habits.forEach(habit => {

            const d = new Date()
            let yearStart = +new Date(d.getFullYear(), 0, 1)
            let today = new Date(d.getFullYear(),d.getMonth(),d.getDate())
            let dayOfYear = ((today - yearStart + 1 ) / 86400000)
            let week = Math.ceil(dayOfYear / 7)
            
            const habitsD = new Date(habit.completedDate)
            let habitsYearStart = +new Date(habitsD.getFullYear(), 0, 1)
            let habitsToday = new Date(habitsD.getFullYear(),habitsD.getMonth(),habitsD.getDate())
            let habitsDayOfYear = ((habitsToday - habitsYearStart + 1 ) / 86400000)
            let habitsWeek = Math.ceil(habitsDayOfYear / 7)
            console.log(habitsWeek, week)

            if(habit.completed === true && habitsWeek === week) {

                let tempDate = new Date(habit.completedDate)
                let dayNumber = tempDate.getDay() - 1
                let dayNames = ['Mon', 'Tues', 'Wed', 'Thurs', 'Fri', 'Sat']
                let dayName = dayNames[dayNumber]
                
                if(dayName === 'Mon'){
                    monday.push(dayName)
                } else if(dayName === 'Tues'){
                    tuesday.push(dayName)
                } else if(dayName === 'Wed'){
                    wednesday.push(dayName)
                } else if(dayName === 'Thurs'){
                    thursday.push(dayName)
                } else if(dayName === 'Fri'){
                    friday.push(dayName)
                } else if(dayName === 'Sat'){
                    saturday.push(dayName)
                } else if(dayName === 'Sun'){
                    sunday.push(dayName)
                }
                dateOfCompletion.push(dayName)
                completedHabits.push(habit)
            }

            let totals  = [ monday.length, tuesday.length, wednesday.length, thursday.length, friday.length, saturday.length, sunday.length ]

            setDataChart({
                labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
                datasets: [{
                    label:'Total Number Of Completed Habits Per Day',
                    data: totals,
                    backgroundColor: ['#ffbd00']
                }]
            })
        })
}

useEffect(() => {
    run()
}, [habits])

    return (
        <div className="barChartContainer">
        <Box mt="3em" mx="5em">
        <Line
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
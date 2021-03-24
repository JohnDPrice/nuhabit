import React, { useContext } from "react";
import { HabitContext } from "../habit/HabitProvider";
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';


export const CompletedHabitCard = ({ habit }) => {
    
    const { completeHabit } = useContext(HabitContext)


    let handleComplete = () => {
        completeHabit(habit.id)
    }

return (
        <Card>
            <Box m="1em">
                <Typography variant="h4" className="habit__name">
                        { habit.name }
                </Typography>
                </Box>
        </Card>
    )
}
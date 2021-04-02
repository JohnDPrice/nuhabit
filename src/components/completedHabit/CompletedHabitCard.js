import React, { useContext } from 'react';
import { HabitContext } from '../habit/HabitProvider';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';
import Tooltip from '@material-ui/core/Tooltip';


export const CompletedHabitCard = ({ habit }) => {
    
    const { uncompleteHabit } = useContext(HabitContext)


    let handleUncomplete = () => {
        uncompleteHabit(habit.id)
    }

return (
        <Card style={{ width: '25em', height: '10em', backgroundColor: '#f2f2f2'}}>
            <Box m="1em">
                <Tooltip title="Add habit back to to do list">
                    <FormControlLabel value={habit.completedDate} control={<Radio defaultChecked onClick={handleUncomplete}/>} label="" />
                </Tooltip>
                <Typography variant="h4" className="habit__name">
                        { habit.name }
                </Typography>
                <Typography variant="body">Completed on {habit.completedDate.substring(0,10)}</Typography>
                </Box>
        </Card>
    )
}
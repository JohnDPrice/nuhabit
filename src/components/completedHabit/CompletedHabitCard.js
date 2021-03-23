import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import { HabitContext } from "../habit/HabitProvider";
import FormControlLabel from "@material-ui/core/FormControlLabel"
import Checkbox from '@material-ui/core/Checkbox';
import EditIcon from '@material-ui/icons/Edit';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import GridListTile from '@material-ui/core/GridListTile';


export const CompletedHabitCard = ({ habit }) => {
    
    const { releaseHabit, setHabits, completeHabit } = useContext(HabitContext)
    const history = useHistory()

    let handleRelease = () => {
        releaseHabit(habit.id)
        .then(() => {
            history.push(`/habits`)
        })
    }

    let time = habit.time

    let handleComplete = () => {
        completeHabit(habit.id)
    }

return (
    <Card>
        <GridListTile>
            <Typography  variant="h4" className="habit__name">
                    { habit.name }
            </Typography>
        </GridListTile>
    </Card>
    )
}
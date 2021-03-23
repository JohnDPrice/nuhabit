import React, { useContext } from "react";
import "./Habit.css";
import { useHistory } from "react-router-dom";
import { HabitContext } from "./HabitProvider";
import FormControlLabel from "@material-ui/core/FormControlLabel"
import Checkbox from '@material-ui/core/Checkbox';
import EditIcon from '@material-ui/icons/Edit';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';


export const HabitCard = ({ habit }) => {
    
    const { releaseHabit, setHabits, completeHabit } = useContext(HabitContext)
    const history = useHistory()

    let handleRelease = () => {
        releaseHabit(habit.id)
        .then(() => {
            history.push(`/habits`)
        })
    }


    let handleComplete = () => {
        completeHabit(habit.id)
    }

   let milToStandard = (habit) => { //If value is the expected length for military time then process to standard time.
    console.log(habit)
        let hour = habit.time.substring(0,1)
        let minutes = habit.time.substring(3,5)
        let identifier = "AM" //Initialize AM PM identifier
        
        if(hour == "12"){
             //If hour is 12 then should set AM PM identifier to PM
          identifier = 'PM';
        }
        if(hour == "0"){ //If hour is 0 then set to 12 for standard time 12 AM
          hour=12;
        }
        if(hour > "12"){ //If hour is greater than 12 then convert to standard 12 hour format and set the AM PM identifier to PM
          hour = hour - 12;
          identifier='PM';
        }
        return hour + ':' + minutes + ' ' + identifier; //Return the constructed standard time
      }

      let timeConverter = () => {
          milToStandard(habit.time)
      }

return (
    <Card>
        <CardContent>
            <Typography  variant="h4" className="habit__name">
                    { habit.name }
            </Typography>
            <FormControlLabel
                control={
                <Checkbox
                    name="habitCompletionCheckbox"
                    color="primary"
                    onClick={handleComplete}
                />
                }
                label="Completed"
            />
            <Typography variant="body" className="habit__time">{ milToStandard(habit) }
            </Typography>
            <div>
                {milToStandard}
            </div>
        </CardContent>
        <CardActions>
            <IconButton>
                <EditIcon style={{ fontSize: 40 }} className="addHabit" onClick={() => history.push(`/habits/edit/${habit.id}`)} />
            </IconButton>
            <IconButton>
                <DeleteIcon style={{ fontSize: 40 }} className="addHabit" onClick={handleRelease}/>
            </IconButton>
        </CardActions>
    </Card>
    )
}
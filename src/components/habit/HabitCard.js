import React, { useContext, useState, useEffect } from "react";
import "./Habit.css";
import { useHistory, useParams } from "react-router-dom";
import { HabitContext } from "./HabitProvider";
import FormControlLabel from "@material-ui/core/FormControlLabel"
import EditIcon from '@material-ui/icons/Edit';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Radio from '@material-ui/core/Radio';
import Tooltip from '@material-ui/core/Tooltip';
import { HabitForm } from './HabitForm'
import { Grid } from "@material-ui/core";


export const HabitCard = ({ habit }) => {
    
    const { releaseHabit, getHabitById, updateHabit } = useContext(HabitContext)
    const history = useHistory()
    const [openPopup, setOpenPopup] = useState(false)


    let handleRelease = () => {
        releaseHabit(habit.id)
        .then(() => {
            history.push(`/habits`)
        })
    }

    useEffect(() => {
        getHabitById()
    }, [])

   let milToStandard = (habit) => { //If value is the expected length for military time then process to standard time.
        let hour = habit.time.substring(0,2)
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

      const handleSaveHabit = (param) => {
            //PUT - update
            param.completedDate = new Date()
            param.completed = true
            updateHabit(param)
      }


return (
        <Card style={{width: '25em', backgroundColor: '#f2f2f2'}}>
            <CardContent>
            <Grid container display="flex" justify="center">
                <Grid item xs={12}>
                    <Tooltip title="Complete Habit">
                        <FormControlLabel control={<Radio id="completedDate" value={habit.completedDate} onChange={() => handleSaveHabit(habit)}/>} label="" />
                    </Tooltip>
                </Grid>
                <Grid item xs={12}>
                    <Typography  variant="h5" className="habit__name">
                            { habit.name }
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <Typography variant="body" className="habit__time">{ milToStandard(habit) }
                    </Typography>
                </Grid>
                <div>
                    {milToStandard}
                </div>
            </Grid>
            </CardContent>
            <CardActions>
                <IconButton>
                    <Tooltip title="Edit Habit">
                        <EditIcon style={{ fontSize: 40 }} className="addHabit" onClick={() => setOpenPopup(true)}></EditIcon> 
                    </Tooltip>
                </IconButton>
                <IconButton>
                    <Tooltip title="Delete Habit">
                        <DeleteIcon style={{ fontSize: 40 }} className="addHabit" onClick={handleRelease}/>
                    </Tooltip>
                </IconButton>
                <HabitForm 
                openPopup = {openPopup} 
                setOpenPopup = {setOpenPopup}
                habitId = {habit.id}
                />
            </CardActions>
        </Card>
    )
}
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


export const HabitCard = ({ habit }) => {
    
    const { releaseHabit, completeHabit, getHabitById, updateHabit, completedHabitDate } = useContext(HabitContext)
    const history = useHistory()
    const [openPopup, setOpenPopup] = useState(false)
    const [completedDate, setCompletedDate] = useState(habit.completedDate)
    const { habitId } = useParams();

    //for edit, hold on to state of habit in this view
    const [ editHabit, setHabit] = useState({
        name: "",
        userId: "",
        time: "",
        habitCategoryId: 0,
        completedDate: new Date()
        })

    const [isLoading, setIsLoading] = useState(true);

    let handleRelease = () => {
        releaseHabit(habit.id)
        .then(() => {
            history.push(`/habits`)
        })
    }

    let handleComplete = () => {
        completeHabit(habit.id)
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

      const handleSaveHabit = () => {
          if (habitId){
            //PUT - update
            updateHabit({
                id: habit.id,
                userId: parseInt(habit.userId),
                name: habit.name,
                habitCategoryId: parseInt(habit.habitCategoryId),
                time: habit.time,
                completed: false,
                completedDate: new Date()
            })
        }
      }

      const handleControlledInputChange = (event) => {
        //When changing a state object or array,
        //always create a copy make changes, and then set state.
        const newHabit = { ...editHabit }
        //habit is an object with properties.
        //set the property to the new value
        newHabit[event.target.name] = event.target.value
        console.log(event, event.target.name)
        //update state
        setCompletedDate(newHabit)
      }

      let onClickFunctions = () => {
          handleComplete()
          completedHabitDate()
          handleSaveHabit()
      }

      useEffect(() => {
        if (habitId){
          getHabitById(habitId)
          .then(editHabit => {
              setHabit(editHabit)
              setIsLoading(false)
          })
        } else {
          setIsLoading(false)
        }
    }, [])

      useEffect(() => {
        getHabitById(habitId)
        .then(setHabit)
    }, [])


return (
    <Card>
        <CardContent>
            <Tooltip title="Complete Habit">
                <FormControlLabel control={<Radio id="completedDate" disabled={isLoading} value={completedDate} onChange={handleControlledInputChange} onClick={onClickFunctions}/>} label="" />
            </Tooltip>
            <Typography  variant="h4" className="habit__name">
                    { habit.name }
            </Typography>
            <Typography variant="body" className="habit__time">{ milToStandard(habit) }
            </Typography>
            <div>
                {milToStandard}
            </div>
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
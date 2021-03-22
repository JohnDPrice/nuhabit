import React, { useContext, useState, useEffect, Fragment } from "react"
import { HabitContext } from "../habit/HabitProvider"
import { HabitCategoryContext } from "../habitCategory/CategoryProvider"
import "./Habit.css"
import { useHistory, useParams } from 'react-router-dom';
import { Button } from "@material-ui/core"
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

export const HabitForm = () => {
    const { addHabit, updateHabit, getHabitById } = useContext(HabitContext)
    const { habitCategories, getHabitCategories } = useContext(HabitCategoryContext)
    
    //for edit, hold on to state of animal in this view
    const [habit, setHabit] = useState({
      name: "",
      userId: "",
      time: "",
      habitCategoryId: 0
    })
    const [habitCategory] = useState([])

    //wait for data before button is active
    const [isLoading, setIsLoading] = useState(true);

    const {habitId} = useParams();
	const history = useHistory();

    const useStyles = makeStyles((theme) => ({
        container: {
          display: 'flex',
          flexWrap: 'wrap',
        },
        textField: {
          marginLeft: theme.spacing(1),
          marginRight: theme.spacing(1),
          width: 100,
        },
      }));
      const classes = useStyles();


    //when field changes, update state. This causes a re-render and updates the view.
    //Controlled component
    const handleControlledInputChange = (event) => {
      //When changing a state object or array,
      //always create a copy make changes, and then set state.
      const newHabit = { ...habit }
      //animal is an object with properties.
      //set the property to the new value
      newHabit[event.target.name] = event.target.value
      //update state
      setHabit(newHabit)
    }

    const handleSaveHabit = () => {
      if (habit.name ===  "") {
          window.alert("Please fill add a name")
      } else {
        //disable the button - no extra clicks
        setIsLoading(true);
        if (habitId){
          //PUT - update
          updateHabit({
              id: habit.id,
              userId: parseInt(habit.userId),
              name: habit.name,
              habitCategoryId: parseInt(habit.habitCategoryId),
              time: habit.time
          })
          .then(() => history.push(`/habits/`))
        }else {
          //POST - add
          addHabit({
            id: habit.id,
            userId: parseInt(localStorage.getItem("nuhabit_user")),
            name: habit.name,
            habitCategoryId: parseInt(habit.habitCategoryId),
            time: habit.time
          })
          .then(() => history.push("/habits"))
        }
      }
    }

    // Get customers and locations. If animalId is in the URL, getAnimalById
    useEffect(() => {
        if (habitId){
          getHabitById(habitId)
          .then(habit => {
              setHabit(habit)
              setIsLoading(false)
          })
        } else {
          setIsLoading(false)
        }
    }, [])

    useEffect(() => {
        getHabitCategories()
    }, [])

    return (
      <form className="habitForm">
        <h2 className="habitForm__title">Add Habit</h2>
        <fieldset>
          <div className="form-group">
            <TextField type="text" id="habitName" name="name" label="Habit" variant="outlined" required autoFocus className="form-control"
            placeholder="Name"
            onChange={handleControlledInputChange}
            defaultValue={habit.name} />
          </div>
        </fieldset>
        <FormControl className={classes.formControl}>
          <InputLabel shrink id="demo-simple-select-placeholder-label-label">
            Category
          </InputLabel>
          <Select
            labelId="demo-simple-select-placeholder-label-label"
            id="habitCategoryId" name="habitCategoryId"
            displayEmpty
            className={classes.selectEmpty}  onChange={handleControlledInputChange} value={habit.habitCategoryId}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {habitCategories.map(c => (
                  <MenuItem key={c.id} value={c.id}>
                      {c.name}
                  </MenuItem>
                ))}
          </Select>
          <FormHelperText>Please Select A Category</FormHelperText>
        </FormControl>

        <TextField
        id="time"
        label="Time"
        type="time"
        name="time"
        onChange={handleControlledInputChange}
        defaultValue="07:30"
        className={classes.textField}
        InputLabelProps={{
          shrink: true,
        }}
        inputProps={{
          step: 300, // 5 min
        }}
      />
        
        <Button className="btn btn-primary" variant="contained" color="primary"
          disabled={isLoading}
          onClick={event => {
            event.preventDefault() // Prevent browser from submitting the form and refreshing the page
            handleSaveHabit()
          }}>
        {habitId ? <>Save Habit</> : <>Save Habit</>}</Button>
      </form>
      
    )
}
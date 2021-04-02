import React, { useContext, useState, useEffect } from "react"
import { HabitContext } from "../habit/HabitProvider"
import { HabitCategoryContext } from "../habitCategory/CategoryProvider"
import "./Habit.css"
import { useHistory } from 'react-router-dom';
import { Button, Dialog, DialogContent, DialogTitle, DialogActions } from "@material-ui/core"
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

export const HabitForm = (props) => {
    const { addHabit, updateHabit, getHabitById } = useContext(HabitContext)
    const { habitCategories, getHabitCategories } = useContext(HabitCategoryContext)
    const { openPopup, setOpenPopup, habitId } = props
    
    //for edit, hold on to state of habit in this view
    const [habit, setHabit] = useState({
      name: "",
      userId: "",
      time: "",
      habitCategoryId: 0,
      completedDate: ""
    })

    //wait for data before button is active
    const [isLoading, setIsLoading] = useState(true);

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
        dialogWrapper : {
          padding : theme.spacing(2),
          position : 'absolute',
          top : theme.spacing(5)
        },
        closeButton: {
          position: 'absolute',
          right: theme.spacing(1),
          top: theme.spacing(1),
          color: theme.palette.grey[500],
        },
      }));
      
      const classes = useStyles;


    //when field changes, update state. This causes a re-render and updates the view.
    //Controlled component
    const handleControlledInputChange = (event) => {
      //When changing a state object or array,
      //always create a copy make changes, and then set state.
      const newHabit = { ...habit }
      //habit is an object with properties.
      //set the property to the new value
      newHabit[event.target.name] = event.target.value
      //update state
      setHabit(newHabit)
    }

    const handleSaveHabit = () => {
      if (habit.name ===  "") {
          window.alert("Please add a habit name")
      } else {

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
          .then(() => history.push(`/habits`))
        }else {
          //POST - add
          addHabit({
            id: habit.id,
            userId: parseInt(localStorage.getItem("nuhabit_user")),
            name: habit.name,
            habitCategoryId: parseInt(habit.habitCategoryId),
            time: habit.time,
            completed: false,
            completedDate: new Date()
          })
          .then(() => setHabit({
            name: "",
            userId: "",
            time: "",
            habitCategoryId: 0
          }))
          .then(() => history.push("/habits"))
        }
      }
    }

    // Get habits. If habitId is in the URL, getHabitById
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
        .then(() => getHabitById(habitId))
        .then(setHabit)
    }, [])


    const handleClose = () => {
      setOpenPopup(false);
    };

    return (
      <Dialog open={openPopup} onClose={handleClose} maxWidth="md" classes={{ paper: classes.closeButton} } >
        <DialogTitle>
            <div style={{ display: 'flex' }}>
            <Typography variant="h5" component="div" style={{ flexGrow:1, marginTop: '.4em' }}>Habit Form</Typography>
            <IconButton aria-label="close" onClick={handleClose}>
                <CloseIcon />
            </IconButton>
            </div>
        </DialogTitle>
        <DialogContent dividers>
            <fieldset>
            <div style={{ display: 'flex', marginBottom: '1em' }}>
              <TextField type="text" id="habitName" name="name" label="Habit" variant="outlined" required autoFocus className="form-control"
              placeholder="Name"
              onChange={handleControlledInputChange}
              defaultValue={habit.name} />
            </div>

            <div style={{ display: 'flex' }}>
            <FormControl className={classes.formControl}>
              <InputLabel shrink id="demo-simple-select-placeholder-label-label">
                Category
              </InputLabel>
              <Select
                labelId="demo-simple-select-placeholder-label-label"
                id="habitCategoryId" name="habitCategoryId"
                displayEmpty
                className={classes.selectEmpty} style={{ marginRight: '.5em' }} onChange={handleControlledInputChange} defaultValue={habit.habitCategoryId}>
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
              defaultValue={habit.time}
              className={classes.textField}
              InputLabelProps={{
                shrink: true,
              }}
              inputProps={{
                step: 300, // 5 min
              }}
            />
          </div>
          </fieldset>
        </DialogContent>
        <DialogActions style={{ display: 'flex' }}>
          <Button className={classes.saveButton} style={{ marginTop: '1em', marginBottom: '1em', marginRight: '6em' }} variant="contained" color="primary"
          disabled={isLoading}
          onClick={event => {
            event.preventDefault()
            handleClose() // Prevent browser from submitting the form and refreshing the page
            handleSaveHabit()
          }}>
            Save Habit
          </Button>
        </DialogActions>
      </Dialog>
   
    )
}
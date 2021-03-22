import React, { useContext } from "react"
import "./Habit.css"
import { useHistory } from "react-router-dom"
import { HabitContext } from "./HabitProvider"
import { Button } from "@material-ui/core"
import FormControlLabel from "@material-ui/core/FormControlLabel"
import Checkbox from '@material-ui/core/Checkbox';


export const HabitCard = ({ habit }) => {
    
    const { releaseHabit, setHabits } = useContext(HabitContext)
    const history = useHistory()

    let handleRelease = () => {
        releaseHabit(habit.id)
        .then(() => {
            history.push(`/habits`)
        })
    }

    let time = habit.time

    // function CheckboxLabels() {
    //     const [state, setState] = React.useState({
    //       checkedB: true
    //     });
    // }


return (
    <section className="habit card">
        <h3 className="habit__name">
                { habit.name }
        </h3>
        <FormControlLabel
            control={
            <Checkbox
                name="checkedB"
                color="primary"
            />
            }
            label="Completed"
        />
        <div className="habit__time">{ time.toLocaleString('en-GB', { timeZone: 'UTC'}) }</div>
        <div className="article__synopsis">{ habit.synopsis }</div>
        <Button className="btn btn-danger" variant="contained" color="secondary" onClick={handleRelease}>Delete</Button>
        <Button className="btn btn-secondary" variant="contained" color="primary" onClick={() => {
            history.push(`/habits/edit/${habit.id}`)
            }}>Edit
        </Button>
    </section>
    )
}
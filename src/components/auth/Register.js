import React, { useRef, useState } from "react"
import { useHistory } from "react-router-dom"
import "./Login.css"
import { Box, Button } from "@material-ui/core"
import { useAuth } from './AuthProvider'
import { Link } from "react-router-dom";
import Card from '@material-ui/core/Card';
import Alert from '@material-ui/lab/Alert';

export const Register = (props) => {
    const email = useRef()
    const password = useRef()
    const passwordConfirmation = useRef()
    const conflictDialog = useRef()
    const history = useHistory()
    const { signup } = useAuth()
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)


    const existingUserCheck = () => {
        return fetch(`http://localhost:8088/users?email=${email.current.value}`)
            .then(res => res.json())
            .then(user => !!user.length)
    }

    async function handleRegister(e) {
        e.preventDefault()
        signup(email.current.value, password.current.value)
        existingUserCheck()
        .then((userExists) => {
            if (!userExists) {
                fetch("http://localhost:8088/users", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        email: email.current.value,
                        password: email.current.value
                    })
                })
                    .then(res => res.json())
                    .then(createdUser => {
                        if (createdUser.hasOwnProperty("id")) {
                            localStorage.setItem("nuhabit_user", createdUser.id)
                        }
                    }).then(() => {history.push('/habits')})
            }
        })

        if(password.current.value !== passwordConfirmation.current.value) {
            return setError('Passwords do not match')
        }

        try {
            setError('')
            setLoading(true)
            await signup(email.current.value, password.current.value)
        } catch {
            setError('Failed to create an account')
        }
        setLoading(false)
        
    }

    return (
        <main style={{ textAlign: "center" }}>
            <dialog className="dialog dialog--password" ref={conflictDialog}>
                <div>Account with that email address already exists</div>
                <Button className="button--close"  variant="contained" color="primary" onClick={e => conflictDialog.current.close()}>Close</Button>
            </dialog>

            <form className="form--login" onSubmit={handleRegister}>
                <h1 className="h3 mb-3 font-weight-normal">Please Register for NuHabit</h1>
                {error && <Alert severity="warning" variant="outlined">{error}</Alert>}
                <Card>
                    <Box p="3em">
                <fieldset>
                    <label htmlFor="inputEmail"> Email address </label>
                    <input ref={email} type="email" name="email" className="form-control" placeholder="Email address" required />
                </fieldset>
                <fieldset>
                    <label htmlFor="inputPassword"> Password </label>
                    <input ref={password} type="password" name="password" className="form-control" placeholder="Password" required />
                </fieldset>
                <fieldset>
                    <label htmlFor="inputPasswordConfirmation"> Password Confirmation</label>
                    <input ref={passwordConfirmation} type="password" name="passwordConfirmation" className="form-control" placeholder="Password" required />
                </fieldset>
                <fieldset>
                    <Button type="submit" variant="contained" color="primary" disabled={loading} className="btn btn-primary"> Register </Button>
                </fieldset>
                    </Box>
                </Card>
            </form>
            <section className="link--login">
                <Box pt="1em" pb="10em">
                    <Link to="/login">Already have an account?</Link>
                </Box>
            </section>
        </main>
    )
}
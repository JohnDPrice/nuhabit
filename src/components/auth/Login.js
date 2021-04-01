import React, { useRef, useState } from "react"
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom"
import "./Login.css"
import { Button, Box } from "@material-ui/core"
import fire from '../fire'
import Card from '@material-ui/core/Card';
import { useAuth } from './AuthProvider'
import Alert from '@material-ui/lab/Alert';

export const Login = props => {
    const email = useRef()
    const password = useRef()
    const existDialog = useRef()
    const history = useHistory()
    const [error, setError] = useState('')
    const { login } = useAuth()
    const [loading, setLoading] = useState(false)

    const existingUserCheck = () => {
        return fetch(`http://localhost:8088/users?email=${email.current.value}`)
            .then(res => res.json())
            .then(user => user.length ? user[0] : false)
    }

    // const handleLogin = (e) => {
    //     e.preventDefault()

    //     existingUserCheck()
    //         .then(exists => {
    //             if (exists) {
    //                 localStorage.setItem("nuhabit_user", exists.id)
    //                 history.push("/habits")
    //             } else {
    //                 existDialog.current.showModal()
    //             }
    //         })
    // }

    async function handleLogin(e) {
        e.preventDefault()

        try {
            setError('')
            setLoading(true)
            await login(email.current.value, password.current.value)
            existingUserCheck()
            .then(exists => {
                if (exists) {
                    localStorage.setItem("nuhabit_user", exists.id)
                    history.push("/habits")
                }
            })
        } catch {
            setError('User does not exist. Please create an account')
        }
        setLoading(false)
        
    }

    return (
        <main className="container--login">
            <dialog className="dialog dialog--auth" ref={existDialog}>
                <div>User does not exist</div>
                <button className="btn btn-primary button--close" onClick={e => existDialog.current.close()}>Close</button>
            </dialog>

            <section>
                <form className="form--login" onSubmit={handleLogin}>
                    <h1>NuHabit</h1>
                    {error && <Alert severity="warning" variant="outlined">{error}</Alert>}
                    <Card>
                        <Box p="3em">
                        <h2>Please sign in</h2>
                        <fieldset>
                            <label htmlFor="inputEmail"> Email address </label>
                            <input ref={email} type="email"
                                id="email"
                                className="form-control"
                                placeholder="Email address"
                                required autoFocus />
                        </fieldset>
                        <fieldset>
                            <label htmlFor="inputPassword"> Password </label>
                            <input ref={password} type="password"
                                id="password"
                                className="form-control"
                                placeholder="Password"
                                required autoFocus />
                        </fieldset>
                        <fieldset>
                            <Button type="submit" variant="contained" color="primary" className="btn btn-primary" onClick={handleLogin}>
                                Sign in
                            </Button>
                        </fieldset>
                        </Box>
                    </Card>
                </form>
            </section>
            <section className="link--register">
                <Box pt="1em">
                    <Link to="/register">Not a member yet?</Link>
                </Box>
            </section>
        </main>
    )
}
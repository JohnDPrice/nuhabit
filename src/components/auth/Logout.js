import React from 'react'
import { useHistory } from 'react-router-dom'
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

export const Logout = props => {
    let history = useHistory()

    const logout = () => {
        localStorage.removeItem('nuhabit_user')

        history.push('/login')
    }

    return (
        <ExitToAppIcon onClick={logout}></ExitToAppIcon>
    )
}
import { Dialog, DialogContent, DialogTitle, makeStyles } from '@material-ui/core'
import React from 'react'
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

const useStyles = makeStyles(theme => ({
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
}))

export const HabitPopup = (props) => {
    const { title, children, openPopup, setOpenPopup } = props
    const classes = useStyles

    const handleClose = () => {
        setOpenPopup(false);
      };

    return (
        <Dialog open={openPopup} onClose={handleClose} classes={{ paper: classes.closeButton} } >
            <DialogTitle>
                <div style={{ display: 'flex' }}>
                <Typography variant="h5" component="div" style={{ flexGrow:1, marginTop: '.4em' }}>{title}</Typography>
                <IconButton aria-label="close" onClick={handleClose}>
                    <CloseIcon />
                </IconButton>
                </div>
            </DialogTitle>
            <DialogContent dividers>
                {children}
            </DialogContent>
        </Dialog>
    )
}
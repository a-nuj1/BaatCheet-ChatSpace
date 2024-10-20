import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material'
import React from 'react'

function ConfirmDeleteDialog({open, handleClose, deleteHandler}) {
  return (
    <Dialog open = {open} onClose={handleClose}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
            <DialogContentText>
                Are you sure you want to delete this group ?
            </DialogContentText>
        </DialogContent>

        <DialogActions>
            <Button onClick={handleClose} color="primary">
                No
            </Button>
            <Button onClick={deleteHandler} color="secondary">
                Yes
            </Button>
        </DialogActions>
    </Dialog>
  )
}

export default ConfirmDeleteDialog
import Alert from '@mui/material/Alert'
import Snackbar from '@mui/material/Snackbar'
import React from 'react'
import { useAppDispatch, useAppSelector } from '../../redux/hooks.ts'
import { hideSnackbar } from '../../redux/snackbar/snackbar.reducer.ts'
import { selectSnackbarData } from '../../redux/snackbar/snackbar.selector.ts'

const SnackBar: React.FC = () => {
  const {
    isOpen,
    message,
    position,
    severity,
    autoHideDuration
  } = useAppSelector(selectSnackbarData)
  const dispatch = useAppDispatch()

  const handleClose = (
    _?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    console.log('handle close snackbar')
    if (reason === 'clickaway') {
      return
    }
    dispatch(hideSnackbar())
  }

  return (
    <Snackbar
      open={isOpen}
      autoHideDuration={autoHideDuration}
      onClose={handleClose}
      anchorOrigin={position}
    >
      <Alert onClose={handleClose} severity={severity} sx={{ width: '100%' }}>
        {message}
      </Alert>
    </Snackbar>
  )
}

export default SnackBar

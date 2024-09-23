import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import React, { useState } from 'react'
import { connect, ConnectedProps } from 'react-redux'
import { Outlet } from 'react-router-dom'
import { createStructuredSelector } from 'reselect'
import { updateApiKeyThunk } from '../../redux/api-key/api-key.reducer.ts'
import { selectApiKey } from '../../redux/api-key/api-key.selector.ts'
import { useAppDispatch } from '../../redux/hooks.ts'
import { showSnackbar } from '../../redux/snackbar/snackbar.reducer.ts'
import { isStringNotEmpty, validateApiKey } from '../../utils/app.utils.ts'
import PageTitle from '../page-title/page-title.component.tsx'
import styles from './dashboard.module.scss'

const Dashboard: React.FC<DashboardPropsFromRedux> = ({ apiKey = '' }) => {
  const dispatch = useAppDispatch()
  const [inputValue, setInputValue] = useState<string>(apiKey)
  const [error, setError] = useState(false)

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value)
    setError(false)
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const apiKeyInput = inputValue.trim()

    if (!validateApiKey(apiKeyInput)) {
      setError(true)
      return
    }

    console.debug('Updating API Key:', apiKeyInput)
    dispatch(updateApiKeyThunk({ apiKey: apiKeyInput }))
      .then(() => {
        dispatch(
          showSnackbar({
            isOpen: true,
            message: 'API Key successfully updated!',
            position: { vertical: 'bottom', horizontal: 'center' },
            severity: 'success',
            autoHideDuration: 4000
          })
        )
      })
  }

  return (
    <div>
      <PageTitle title="Dashboard"></PageTitle>

      <Box
        component="form"
        onSubmit={handleSubmit}
        noValidate
        className={styles.api_key_container}
      >
        <TextField
          label="Crypto Compare API Key"
          autoComplete="off"
          variant="outlined"
          value={inputValue}
          onChange={handleChange}
          required
          error={error}
          helperText={
            error ? 'API Key is required to see data and navigate.' : ''
          }
        />
        <Button type="submit" variant="contained" color="primary">
          {isStringNotEmpty(apiKey) ? 'Update Your API Key' : 'Add API Key'}
        </Button>
      </Box>

      <Outlet />
    </div>
  )
}

const mapStateToProps = createStructuredSelector({
  apiKey: selectApiKey
})

const connector = connect(mapStateToProps)

export type DashboardPropsFromRedux = ConnectedProps<typeof connector>

const ConnectedDashboard = connector(Dashboard)
export default ConnectedDashboard
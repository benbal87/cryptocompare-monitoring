import MenuIcon from '@mui/icons-material/Menu'
import MenuOpenIcon from '@mui/icons-material/MenuOpen'
import AppBar from '@mui/material/AppBar'
import IconButton from '@mui/material/IconButton'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import React from 'react'
import { connect, ConnectedProps } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { useAppDispatch } from '../../redux/hooks.ts'
import { toggleNavbar } from '../../redux/navigation/navigation.reducer.ts'
import {
  selectIsNavbarOpen
} from '../../redux/navigation/navigation.selector.ts'
import DynamicBreadcrumbs
  from '../dynamic-breadcrumbs/dynamic-breadcrumbs.component.tsx'

const Header: React.FC<HeaderPropsFromRedux> = ({
  isNavbarOpen
}: HeaderPropsFromRedux) => {
  const dispatch = useAppDispatch()

  const handleToggle = () => {
    dispatch(toggleNavbar())
  }

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          <DynamicBreadcrumbs />
        </Typography>

        <IconButton color="inherit" onClick={handleToggle} edge="end">
          {isNavbarOpen ? <MenuIcon /> : <MenuOpenIcon />}
        </IconButton>
      </Toolbar>
    </AppBar>
  )
}

const mapStateToProps = createStructuredSelector({
  isNavbarOpen: selectIsNavbarOpen
})

const connector = connect(mapStateToProps)

export type HeaderPropsFromRedux = ConnectedProps<typeof connector>

const ConnectedHeader = connector(Header)
export default ConnectedHeader

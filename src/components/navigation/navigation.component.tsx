import AlertsIcon from '@mui/icons-material/Campaign'
import DashboardIcon from '@mui/icons-material/Dashboard'
import HomeIcon from '@mui/icons-material/Home'
import MonitorIcon from '@mui/icons-material/Insights'
import Box from '@mui/material/Box'
import Divider from '@mui/material/Divider'
import Drawer from '@mui/material/Drawer'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import React from 'react'
import './navigation.module.scss'
import { connect, ConnectedProps } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { createStructuredSelector } from 'reselect'
import { useAppDispatch } from '../../redux/hooks.ts'
import { toggleNavbar } from '../../redux/navigation/navigation.reducer.ts'
import {
  selectIsNavbarOpen
} from '../../redux/navigation/navigation.selector.ts'

const LINKS: NavigationLink[] = [
  { icon: HomeIcon, to: '/', label: 'Home' },
  { icon: DashboardIcon, to: '/dashboard', label: 'Dashboard', divider: true },
  { icon: MonitorIcon, to: '/dashboard/monitor', label: 'Monitor' },
  { icon: AlertsIcon, to: '/dashboard/alerts', label: 'Alerts' }
]

const Navigation: React.FC<NavigationPropsFromRedux> = ({
  isNavbarOpen
}: NavigationPropsFromRedux) => {
  const dispatch = useAppDispatch()

  const handleClose = () => {
    dispatch(toggleNavbar(false))
  }

  return (
    <Drawer open={isNavbarOpen} onClose={handleClose}>
      <Box
        sx={{ width: 250 }}
        role="presentation"
        onClick={handleClose}
      >
        <List>
          {
            LINKS.map(({ icon: Icon, label, to, divider }: NavigationLink) =>
              (
                <React.Fragment key={to}>
                  <ListItem
                    disablePadding
                    component={NavLink}
                    to={to}
                    sx={{ '&.active': { color: 'aqua' } }}
                  >
                    <ListItemButton>
                      <ListItemIcon>
                        <Icon />
                      </ListItemIcon>
                      <ListItemText primary={label} />
                    </ListItemButton>
                  </ListItem>

                  {divider && <Divider />}
                </React.Fragment>
              ))
          }
        </List>
      </Box>
    </Drawer>
  )
}

const mapStateToProps = createStructuredSelector({
  isNavbarOpen: selectIsNavbarOpen
})

const connector = connect(mapStateToProps)

export type NavigationPropsFromRedux = ConnectedProps<typeof connector>
export type NavigationLink = {
  icon: React.ComponentType
  to: string;
  label: string
  divider?: boolean
}

const ConnectedNavigation = connector(Navigation)
export default ConnectedNavigation
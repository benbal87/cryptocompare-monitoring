import Breadcrumbs from '@mui/material/Breadcrumbs'
import Link from '@mui/material/Link'
import Typography from '@mui/material/Typography'
import React from 'react'
import { Link as RouterLink, useLocation } from 'react-router-dom'

const generateBreadcrumbs = (pathName: string) => {
  const pathNames = pathName.split('/').filter(x => x)
  return pathNames.map((value, index) => {
    const to = `/${pathNames.slice(0, index + 1).join('/')}`
    const label = value.charAt(0).toUpperCase() + value.slice(1)
    return index === pathNames.length - 1
      ? <Typography key={to} sx={{ color: 'white' }}>{label}</Typography>
      : (
        <Link
          key={to}
          sx={{ color: 'white' }}
          component={RouterLink}
          underline="hover"
          to={to}
        >
          {label}
        </Link>
      )
  })
}

const DynamicBreadcrumbs: React.FC = () => {
  const location = useLocation()
  const { pathname } = location
  const breadcrumbs = generateBreadcrumbs(pathname)

  return (
    <Breadcrumbs aria-label="breadcrumb">
      <Link sx={{ color: 'white' }} component={RouterLink} to="/">
        Home
      </Link>
      {breadcrumbs}
    </Breadcrumbs>
  )
}

export default DynamicBreadcrumbs
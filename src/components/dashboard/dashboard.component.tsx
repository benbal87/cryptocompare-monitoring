import React from 'react'
import { Outlet } from 'react-router-dom'
import PageTitle from '../page-title/page-title.component.tsx'

const Dashboard: React.FC = () => {
  return (
    <div>
      <PageTitle title="Dashboard"></PageTitle>
      <Outlet />
    </div>
  )
}

export default Dashboard
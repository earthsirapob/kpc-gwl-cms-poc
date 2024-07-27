import { AdminViewComponent } from 'payload/config'
import React from 'react'
export const MyDashboardView: AdminViewComponent = ({ user }) => {
  return <div style={{ fontSize: 48 }}>Welcome back {user.email}</div>
}

export default MyDashboardView

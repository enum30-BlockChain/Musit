import React from 'react'
import { Activity } from './activity/Activity'
import { Contentbox } from './contentbox/Contentbox'
import "./Dashboard.css"

export const Dashboard = () => {
  return (
    <div className='dashboard'>
      <div className="overview">
        <Contentbox/>
        <Activity/>
      </div>
    </div>
  )
}

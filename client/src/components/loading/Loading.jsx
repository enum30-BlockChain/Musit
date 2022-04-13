import React from 'react'
import { CircularProgress } from '@mui/material'
import "./Loading.css"

const Loading = () => {
  return (
    <div className='loading-container'>
      <CircularProgress className='loading-circle'/>
    </div>
  )
}

export default Loading
import React from 'react'
import "./Contentbox.css"

export const Contentbox = () => {
  return (
    <div className='contentbox'>
      <div className="title">
        <i className="uil uil-create-dashboard"></i>
        <span className="text">Dashboard</span>
      </div>

      <div className="boxes">
        <div className="box box1">
          <i className="uil uil-thumbs-up"></i>
          <span className="text">Total Likes</span>
          <span className="number">50,120</span>
        </div>
        <div className="box box2">
          <i className="uil uil-comments"></i>
          <span className="text">Comments</span>
          <span className="number">23,123</span>
        </div>
        <div className="box box3">
          <i className="uil uil-share"></i>
          <span className="text">Total Share</span>
          <span className="number">23,232</span>
        </div>
      </div>
    </div>
  )
}

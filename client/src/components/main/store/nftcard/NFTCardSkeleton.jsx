import { Skeleton } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'
import "./NFTCardSkeleton.css"

const NFTCardSkeleton = () => {
  return (
    <>
      <div className="item-card">
				<div className="img-box">
          <Skeleton variant='circular' width={"100%"} height={"100%"} />
				</div>
				<div className="content-wrap">
          <Skeleton className="color-box" variant='rectangular' width={"100%"} height={"100%"} />
          <Skeleton className="info-wrap" variant='rectangular' width={"100%"} height={"100%"} />
				</div>
			</div>
    </>
  )
}

export default NFTCardSkeleton
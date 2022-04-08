import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createArtistData, deleteMyArtistData, readArtistList, readMyArtistData, updateMyArtistData } from './redux/actions/artistActions'

const Ysh = () => {
  const userInfo = useSelector(state=>state.user)
  
  const dispatch = useDispatch()
  const createOnClick = async () => {
    await dispatch(createArtistData({
      artist_name: "Thor",
      user_address: userInfo.address,
    }))
  }

  const readListOnClick = async () => {
    await dispatch(readArtistList())
  }

  const readOnClick = async () => {
    await dispatch(readMyArtistData())
  }
  
  const updateOnClick = async () => {
    await dispatch(updateMyArtistData({
      img: "artist-profile",
    }))
  }

  const deleteOnClick = async () => {
    await dispatch(deleteMyArtistData())
  }
  return (
    <div>
      <h1>Artist test</h1>
      <button onClick={createOnClick}>Create</button>
			<button onClick={readListOnClick}>Read All Artists</button>
			<button onClick={readOnClick}>Read My Artist Info</button>
			<button onClick={updateOnClick}>Update</button>
			<button onClick={deleteOnClick}>Delete</button>
    </div>
  )
}

export default Ysh
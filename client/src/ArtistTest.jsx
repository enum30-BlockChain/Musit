import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createArtistData, deleteMyArtistData, readArtistList, readMyArtistData, updateMyArtistData } from './redux/actions/artistActions'

const ArtistTest = () => {
  const userInfo = useSelector(state=>state.user)
  const artistList = useSelector(state=>state.artistList.data)
  
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
			<div>
				<button onClick={createOnClick}>Create</button>
			</div>
			<div>
				<button onClick={readListOnClick}>Read All Artists</button>
				{!artistList.loading && artistList.length > 0 ? (
					artistList.map((artist, index) => (
						<div key={index} style={{display : "flex", justifyContent:"center"}}>
							<div>{artist.artist_name}</div>
              <i className="uil uil-heart"></i>
						</div>
					))
				) : (
					<>아티스트 리스트 못찾음</>
				)}
			</div>
			<button onClick={readOnClick}>Read My Artist Info</button>
			<button onClick={updateOnClick}>Update</button>
			<button onClick={deleteOnClick}>Delete</button>
		</div>
	);
}

export default ArtistTest
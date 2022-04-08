import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import './App.css'
import { readArtistList, readMyArtistData } from './redux/actions/artistActions'
import { readMetamaskData } from './redux/actions/metamaskAction'
import { readMusicList } from './redux/actions/musicActions'
import { createUserData, deleteUserData, readUserData, updateUserData } from './redux/actions/userActions'

function App() {
  const user = useSelector(state => state.user)
  const dispatch = useDispatch()

  useEffect(() => {
    const init = async () => {
      await dispatch(readMetamaskData());
      await dispatch(readUserData());
      // await dispatch(readArtistList());
      // await dispatch(readMyArtistData())
      // await dispatch(readMusicList())
    }
    init()
  }, []);
  const createOnClick = async () => {
    await dispatch(createUserData({
      address: "0x2Eb8c98E360d146165b8F1f819F8863d41C4Eb6D",
      genre: ["test1", "test2", "test3"],
      nation: "option",
      nickname: "nickname",
      img: "DBdata.cover_img_link",
    }))
  }

  const readOnClick = async () => {
    await dispatch(readUserData())
  }
  
  const updateOnClick = async () => {
    await dispatch(updateUserData({
      nickname: "피카추",
      genre:["1", "2"]
    }))
  }

  const deleteOnClick = async () => {
    await dispatch(deleteUserData())
  }

  if (user.loading) {
    return (
      <>
        스켈레톤,
        스피너
      </>
    )
  } else 
  return (
		<div className="App">
			<button onClick={createOnClick}>Create</button>
			<button onClick={readOnClick}>Read</button>
			<button onClick={updateOnClick}>Update</button>
			<button onClick={deleteOnClick}>Delete</button>
			{user.error ? (
				<>유저없음</>
			) : (
				<div>
					<div>{user.address}</div>
					<div>{user.nickname}</div>
				</div>
			)}
		</div>
	);
}

export default App

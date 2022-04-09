import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import './App.css'
import { readArtistList, readMyArtistData } from './redux/actions/artistActions'
import { readMetamaskData } from './redux/actions/metamaskAction'
import { readMusicList } from './redux/actions/musicActions'
import { createUserData, deleteUserData, readUserData, updateUserData } from './redux/actions/userActions'
import { createMusicData } from './redux/actions/musicActions'
import Test from './Test'
import ArtistTest from './ArtistTest'
import UserTest from './UserTest'

function App() {
  const user = useSelector(state => state.user)
  const dispatch = useDispatch()

  useEffect(() => {
    const init = async () => {
      await dispatch(readMetamaskData());
      await dispatch(readUserData());
      await dispatch(readArtistList());
      await dispatch(readMyArtistData())
      await dispatch(readMusicList())
    }
    init()
  }, []);

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
			
			{user.error ? (
				<>유저없음</>
			) : (
				<div>
					<div>{user.address}</div>
					<div>{user.nickname}</div>
          <UserTest/>
          <ArtistTest/>
          <Test />
				</div>
			)}
		</div>
	);
}

export default App

import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import './App.css'
import { fetchArtistList, fetchMyArtistData } from './redux/actions/artistActions'
import { fetchMetamaskData } from './redux/actions/metamaskAction'
import { fetchMusicList } from './redux/actions/musicActions'
import { createUserData, fetchUserData, updateUserData } from './redux/actions/userActions'

function App() {
  const user = useSelector(state => state.user)
  const dispatch = useDispatch()

  useEffect(() => {
    const init = async () => {
      await dispatch(fetchMetamaskData());
      await dispatch(fetchUserData());
      await dispatch(fetchArtistList());
      await dispatch(fetchMyArtistData())
      await dispatch(fetchMusicList())
    }
    init()
  }, []);
  const handleOnClick = async () => {
    await dispatch(createUserData({
      nickname: "test",
      genre: "test",
      nation: "test",
      img: "test",
    }))
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
      <button onClick={handleOnClick} >CLICK</button>
      {user.error ? <>유저없음</> : <>컴포넌트</>}
      {user.address}
    </div>
  )
}

export default App

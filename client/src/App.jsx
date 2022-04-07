import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import './App.css'
import { readArtistList, readMyArtistData } from './redux/actions/artistActions'
import { readMetamaskData } from './redux/actions/metamaskAction'
import { readMusicList } from './redux/actions/musicActions'
import { createUserData, readUserData, updateUserData } from './redux/actions/userActions'

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

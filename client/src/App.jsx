import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import './App.css'
import { fetchArtistList, fetchMyArtistData } from './redux/actions/artistActions'
import { fetchMetamaskData } from './redux/actions/metamaskAction'
import { fetchUserData, updateUserData } from './redux/actions/userActions'

function App() {
  const user = useSelector(state => state.user)
  const dispatch = useDispatch()

  useEffect(() => {
    const init = async () => {
      await dispatch(fetchMetamaskData());
      await dispatch(fetchUserData());
      await dispatch(fetchArtistList());
      await dispatch(fetchMyArtistData());
    }
    init()
  }, []);
  const handleOnClick = async () => {
    await dispatch(fetchMetamaskData())
    await dispatch(updateUserData())
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

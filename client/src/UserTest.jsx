import React from 'react'

const UserTest = () => {
  const createOnClick = async () => {
    await dispatch(createUserData({
      address: "test1",
      genre: ["test1", "test2", "test3"],
      nation: "option1",
      nickname: "nickname1",
      img: "img1",
    }))
  }

  const readOnClick = async () => {
    await dispatch(readUserData())
  }
  
  const updateOnClick = async () => {
    await dispatch(updateUserData({
      nickname: "라이츄",
      genre:["1", "2"]
    }))
  }

  const deleteOnClick = async () => {
    await dispatch(deleteUser())
  }

  return (
    <div>
      <button onClick={createOnClick}>Create</button>
			<button onClick={readOnClick}>Read</button>
			<button onClick={updateOnClick}>Update</button>
			<button onClick={deleteOnClick}>Delete</button>
    </div>
  )
}

export default UserTest
import React, { useEffect } from 'react'
import Ethers from '../../web3/Ethers'

const YshTest = () => {
  async function init () {
    // const result = await Ethers.test()
    console.log(await Ethers.getIsMintEnabled())
  } 

  useEffect(() => {
    init();
  }, [])
  

  return (
    <>
      <div>
        <h1>YSH TEST PAGE</h1>
      </div>
    </>
  )
}

export default YshTest
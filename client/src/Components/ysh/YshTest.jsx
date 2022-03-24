<<<<<<< HEAD
import React, { useEffect } from 'react'
import Ethers from '../../web3/Ethers'

const YshTest = () => {
  async function init () {
    // console.log(await Ethers.setIsMintEnabled(true))
    console.log(await Ethers.getTotalSupplied())
    const result = await Ethers.minting("a;sodfjals;dfl");
    console.log(result);
  } 

  useEffect(() => {
    init();
  }, [])
  

  return (
    <>
      <div>
        <h1>YSH TEST PAGE</h1>
      </div>
=======
import React from "react";
const YshTest = () => {
  return (
    <>
      <div>dfkljlk</div>
>>>>>>> min1
    </>
  );
};

export default YshTest;

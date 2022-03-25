import React, { useEffect, useState } from 'react'
import Ethers from '../../web3/Ethers'
import Button from "../styledComponents/Button.styled";

const YshTest = () => {
  const [tokenURI, setTokenURI] = useState("");
  const [signMessage, setSignMessage] = useState("Verify signer");

  async function init () {
    await Ethers.test()
  } 

  useEffect(() => {
    init();
  }, [])
  
  async function mintingOnClick (tokenURI) {
    console.log(await Ethers.minting(tokenURI))
  }

  async function mintingEnableOnClick () {
    console.log(await Ethers.setIsMintEnabled(true))
  }

  async function mintingOnChange (e) {
    setTokenURI(e.target.value);
  }
  
  async function verifySignerOnClick (message) {
    return await Ethers.signToVerify(message);
  }
  
  async function verifySignerOnChange (e) {
    setSignMessage(e.target.value);
  }

  return (
    <>
      <div>
        <h1>YSH TEST PAGE</h1>
        <div>
          <input onChange={verifySignerOnChange} placeholder="Message for signing" type="text" />
          <Button onClick={() => verifySignerOnClick(signMessage)}>Verify Signer</Button>
        </div>

        <div>
        </div>
        <div>
          <input onChange={mintingOnChange} placeholder="tokenURI" type="text" />
          <Button onClick={() => mintingOnClick(tokenURI)}>Minting</Button>
          <Button onClick={() => mintingEnableOnClick()}>Enable</Button>
        </div>
      </div>
    </>
  );
};

export default YshTest;

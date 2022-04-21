import "./LandigMainPage.css";
import React, { useEffect, useState,useRef } from "react";

export default function LandingMainPage() {
  const audioPlayer = useRef();
  const [name, setName] = useState("Tracks")
  const musicBox=[
    {title:"Jawbreaker - Do You Still Hate Me?" ,track:"https://s3-us-west-2.amazonaws.com/s.cdpn.io/59639/rock.m4a"},
    {title:"Judas Priest - Painkiller" , track:"https://s3-us-west-2.amazonaws.com/s.cdpn.io/59639/metal.m4a"},
    {title:"Stevie Wonder - For Once In My Life", track:"https://raw.githubusercontent.com/ricardoolivaalonso/recursos/master/radio/radio.mp3"},
  ]
  const Tape =async (e)=>{
    audioPlayer.current.src=musicBox[e.target.title].track;
    await audioPlayer.current.play();
  }

  return (
    <>
    <div class="container">
    <div class="buff-jambox">
        <div class="jambox">
            <div class="speaker top-left"></div>
            <div class="speaker top-right"></div>
            <div class="speaker bottom-left"></div>
            <div class="speaker bottom-right"></div>
        </div>
        <div class="arms">
            <div class="arm left-arm">
                <div class="bicep left-bicep"></div>
                <div class="forearm left-forearm"></div>
            </div>
            <div class="arm right-arm">
                <div class="bicep right-bicep"></div>
                <div class="forearm right-forearm"></div>
            </div>
        </div>
    </div>
    <div class="tracks">
        <h2 class="title">{name}</h2>
        <a class="track" onClick={Tape} title='0'></a>
        <a class="track" onClick={Tape} title='1'></a>
        <a class="track" onClick={Tape} title='2'></a>
        <audio ref={audioPlayer} />
    </div>
        
</div>

    </>
  );
}

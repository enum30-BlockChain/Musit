import axios from 'axios'
import React ,{useState,createContext,useEffect} from 'react'

export const MusicCardContext = createContext();

 function MusicCard(props) {
    console.log(props.audio)
  return (
    <>
      <table>
        <thead>
          <th>타이틀</th>
          <th>작곡가</th>
          <th>img</th>
          <th>auido</th>
        </thead>
        <tbody>
          <tb>{props.title}</tb>
          <tb>{props.artistName}</tb>
          <tb>
            <img src={props.img} style={{width:"200px"}} />
          </tb>
          <tb>
            <audio src={props.audio} controls />
          </tb>
        </tbody>
      </table>
    </>
  );
}
export default MusicCard;
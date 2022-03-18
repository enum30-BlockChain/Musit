import axios from 'axios'
import React ,{useState,createContext,useEffect} from 'react'

export const MusicCardContext = createContext();

 function MusicCard(props) {
  return (
    <>
      <tbody>
        <tr>
          <td>{props.id}</td>
          <td>{props.title}</td>
          <td>{props.artistName}</td>
          <td>
            <img src={props.img} style={{ width: "100px" }} />
          </td>
          <td>
            <audio src={props.audio} controls />
          </td>
          <td>{props.count}</td>
          <td>{props.like}</td>
          <td><button> 수정 </button> </td>
        </tr>
      </tbody>
    </>
  );
}
export default MusicCard;
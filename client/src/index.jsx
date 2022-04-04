import './index.css';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter } from 'react-router-dom';

import {createStore} from 'redux'
import {Provider, useSelector, useDispatch} from 'react-redux';
import store from "./redux/store.js"

// function reducer(currentState, action) {
//   if(currentState === undefined){
//     return{
//       mySonglist:[],
//       searchWord:"",
//     };
//   }

//   const newState = {...currentState};
//   if(action.type === 'SONG_LIST_UPDATE'){
//     newState.mySonglist= action.payload;
//   }else if(action.type === 'SONG_LIST_ADD'){
//     newState.mySonglist.push(action.payload);
//   }else if(action.type === 'SONG_LIST_POP'){
//     newState.mySonglist = action.payload;
//   }
//   if(action.type === 'SEARCHING'){
//     newState.searchWord = action.payload;
//   }
//   return newState;
// }

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
import './index.css';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter } from 'react-router-dom';

import {createStore} from 'redux'
import {Provider, useSelector, useDispatch} from 'react-redux';
const store = createStore(reducer);

function reducer(currentState, action) {
  if(currentState === undefined){
    return{
      mySonglist:[],
    };
  }

  const newState = {...currentState};
  if(action.type === 'SONG_LIST_UPDATE'){
    newState.mySonglist= action.payload;
    console.log(action.payload)
  }
  if(action.type === 'SONG_LIST_ADD'){
    newState.mySonglist.push(action.payload)
    console.log(newState)
  }
  return newState;
}

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
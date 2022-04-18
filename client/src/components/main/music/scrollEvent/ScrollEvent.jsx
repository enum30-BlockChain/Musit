import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import useIntersect from "./UseIntersect";
import "./styles.css";
import MainCard from "../main/MainCard";
import { useSelector } from "react-redux";
const fakeFetch = (delay = 1000) => new Promise(res => setTimeout(res, delay));

const ListItem = ({ number }) => (
  <div className="ListItem">
    <span>마지막 음악입니다.</span>
  </div>
);


function ScrollEvent() {
  const musicList = useSelector((state) => state.musicList).data;
  const result = [...musicList].sort((a,b)=>a.title < b.title? -1 :a.title>b.title?1:0)
  const [state, setState] = useState({ itemCount: 0, isLoading: false });
  /* fake async fetch */
  const { itemCount, isLoading } = state;

  const fetchItems = async () => {
      setState(prev => ({ ...prev, isLoading: true }));
      await fakeFetch();
      setState(prev => ({
        itemCount: prev.itemCount + 13,
        isLoading: false
      }));
  };

  /* initial fetch */
  useEffect(() => {
    fetchItems();
  }, []);

  const [_, setRef] = useIntersect(async (entry, observer) => {
      observer.unobserve(entry.target);
      await fetchItems();
      observer.observe(entry.target);
  }, {});

  if (!itemCount) return null;
  return (
    <div className="scrollEventContant">
      {[...Array(itemCount)].map((_, i) => {
        if(result.length > i){
          return <MainCard
          id={i}
          key={i}
          music={result[i]}
         />;
        }else if(result.length +1 > i){
          return <ListItem key={i} number={i} />;
        }
      })}
      <div ref={setRef} className="Loading">
        {isLoading && "Loading..."}
      </div>
    </div>
  );
}
export default ScrollEvent;
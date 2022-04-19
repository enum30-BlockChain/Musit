import React, { useState, useEffect } from "react";
import useIntersect from "./UseIntersect";
import "./ScrollEvent.css";
import MainCard from "../main/MainCard";
import { useSelector } from "react-redux";
import SimpleBackdrop from "../SimpleBackdrop";

const fakeFetch = (delay = 500) => new Promise(res => setTimeout(res, delay));

const ListItem = () => (
  <div className="ListItem">
    <span>마지막 음악입니다.</span>
  </div>
);


function ScrollEvent() {
  const [lodingState,setLoadingState] = useState(true);
  const musicList = useSelector((state) => state.musicList).data;
  const result = [...musicList].sort((a,b)=>a.title < b.title? -1 :a.title>b.title?1:0)
  const [state, setState] = useState({ itemCount: 0, isLoading: false });
  const [open, setOpen] = useState(true);
  /* fake async fetch */
  const { itemCount, isLoading } = state;

  const fetchItems = async () => {
      setState(prev => ({ ...prev, isLoading: true }));
      await fakeFetch();
      setState(prev => ({
        itemCount: prev.itemCount + 13,
        isLoading: false
      }));
      setLoadingState(false)
    };
    
  useEffect(() => {
      fetchItems();
  }, []);

  const [_, setRef] = useIntersect(async (entry, observer) => {
      observer.unobserve(entry.target);
      await fetchItems();
      observer.observe(entry.target);
  }, {});

  const handleClose = () => {
    setOpen(false);
  };

  if(lodingState){
    return(
      <>
        <SimpleBackdrop />
      </>
    )
  }else{
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
}
export default ScrollEvent;
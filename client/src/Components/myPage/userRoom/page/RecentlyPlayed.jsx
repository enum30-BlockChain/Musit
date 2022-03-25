import React, { useState } from "react";
import { useOutletContext } from "react-router-dom";
import axios from "axios";
import RecentCard from "../card/RecentCard";

const RecentlyPlayed = () => {
  const [address, , , song] = useOutletContext();

  return (
    <>
      <div>
        <RecentCard song={song} address={address} />
      </div>
    </>
  );
};

export default RecentlyPlayed;

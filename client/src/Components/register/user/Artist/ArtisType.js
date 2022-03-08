import React from "react";

const ArtisType = (Name, setName) => {
  const handleOnChangeName = (e) => {
    setName(e.target.value);
    console.log(e.target.value);
  };

  return (
    <>
      <div>아티스트명</div>
      <div className="artist-name">
        <input
          type="text"
          placeholder="아티스트명"
          name="artist"
          value={Name}
          onChange={handleOnChangeName}
        />
        <button>중복확인</button>
      </div>
    </>
  );
};

export default ArtisType;

import React, { useState } from "react";
import { createMusicData } from "./redux/actions/musicActions";
import { useDispatch, useSelector } from "react-redux";

export default function Test() {
	const dispatch = useDispatch();
	const [albumCoverImgFile, setAlbumCoverImgFile] = useState("");
	const [audiofile, setAudiofile] = useState("");
	const [duration, setDuration] = useState(0);
	const imgFormData = new FormData();
	const audioFormData = new FormData();
	
	const getImg = (e) => {
		setAlbumCoverImgFile(e.target.files[0]);
	};
	const getAudio = (e) => {
		if (e.target.files[0].size > 1048576 * 15) {
			// Max size: 10MB (1MB = 1,048,576 bytes)
			alert("You can upload less than 15MB.");
			e.target.value = "";
		} else {
			setAudiofile(e.target.files[0]);
		}
	};
	const submit = async () => {
		imgFormData.append("img", albumCoverImgFile);
		audioFormData.append("audio", audiofile);
		audioFormData.append("duration", duration);

		dispatch(createMusicData(imgFormData, audioFormData));
	};
	return (
		<div>
			<input name="imgUpload" type="file" accept="image/*" onChange={getImg} />
			{albumCoverImgFile && (
				<img
					src={URL.createObjectURL(albumCoverImgFile)}
					style={{ width: "200px" }}
				></img>
			)}
			<input type="file" accept="audio/*" onChange={getAudio} />
			{audiofile && (
				<audio
					src={URL.createObjectURL(audiofile)}
					onLoadedData={(e) => {
						setDuration(e.currentTarget.duration);
					}}
					autoPlay
					loop
					controls
				>
					오디오 지원되지 않는 브라우저
				</audio>
			)}
			<button onClick={submit}> submit </button>
		</div>
	);
}

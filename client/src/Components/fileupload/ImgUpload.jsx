import React, { useEffect, useState } from "react";

const { create } = require("ipfs-http-client");


export const ImgUpload = () => {
    const [upLoadText, setUpLoadText] = useState("")
    const [ipfsHash, setipfsHash] = useState("")
    const [Hash, setHash] = useState("")
    const [getText, setgetText] = useState("")
    const [getText1, setgetText1] = useState([])
    const [bufferArray,setbufferArray] = useState("https://ipfs.io/ipfs/")
    async function ipfsClient() {   //서버오픈
        const ipfs = await create(
            {
                host: "ipfs.infura.io",
                port: 5001,
                protocol: "https"
            }
        );
        return ipfs;
    }

    async function saveText() {
        let ipfs = await ipfsClient();
        let result = await ipfs.add(upLoadText);
        setipfsHash(result.path);
    }

    async function getData() {
        let ipfs = await ipfsClient();
        let asyncitr = ipfs.cat(Hash)
    
        for await (const itr of asyncitr) {

            let data = Buffer.from(itr).toString()
            setgetText(data)
        }
    }
    async function getData1() {
        let ipfs = await ipfsClient();
        let asyncitr = ipfs.cat(Hash)
        let box =[]
        for await (const itr of asyncitr) {
            let data = itr
            box.push(data)
        }
        setgetText1(box)
        console.log(box)
        // setbufferArray(`https://ipfs.io/ipfs/${Hash}`)
        // console.log(bufferArray)
    }

    //파일 미리볼 url을 저장해줄 state
  const [fileImage, setFileImage] = useState("");
  // 파일 저장
  const saveFileImage = (e) => {
    // setFileImage(URL.createObjectURL(e.target.files[0]));
    setFileImage(e.target.files[0]);
    console.log(fileImage)
  };
  const uploadFileImage = async (e) => {
    let ipfs = await ipfsClient();
    let result = await ipfs.add(fileImage);
    console.log(result);
  };
  // 파일 삭제
  const deleteFileImage = () => {
    URL.revokeObjectURL(fileImage);
    setFileImage("");
  };

  //해시값으로받은 img Uint8Array
  const content = new Uint8Array([137, 80, 78, 71, 13, 10, 26, 10, 0, 0, 0, 13, 73, 72, 68, 82, 0, 0, 0, 5, 0, 0, 0, 5, 8, 6, 0, 0, 0, 141, 111, 38, 229, 0, 0, 0, 28, 73, 68, 65, 84, 8, 215, 99, 248, 255, 255, 63, 195, 127, 6, 32, 5, 195, 32, 18, 132, 208, 49, 241, 130, 88, 205, 4, 0, 14, 245, 53, 203, 209, 142, 14, 31, 0, 0, 0, 0, 73, 69, 78, 68, 174, 66, 96, 130]);
  
  const see = URL.createObjectURL(
    new Blob(getText1, { type:  'audio/mp3'  } )
  );

  
  return (
    <>
    <p/>
    <input value={upLoadText} onChange={(e)=>{setUpLoadText(e.target.value)}}/>
    <button onClick={saveText}>saveText</button>
    <p>생성해쉬값 : {ipfsHash}</p>
    <input value={Hash} onChange={(e)=>{setHash(e.target.value)}}/>
    <button onClick={getData}>get Text</button>
    <p> </p>
    <h1>{getText}</h1>
    <input value={Hash} onChange={(e)=>{setHash(e.target.value)}}/>
    <button onClick={getData1}>get Array</button>
    <p> </p>
    <h1>{getText1}</h1>
    
    {/* <img   src="https://ipfs.io/ipfs/Qmf4MtHdYo87H2fmwGPq6ktGTy67VTpw81XnAKCpP65hBC" />
    <audio src={bufferArray} autoplay loop controls>오디오 지원되지 않는 브라우저</audio>

    <audio src={see}autoplay loop controls>오디오 지원되지 않는 브라우저</audio>
    <img id="my-img" src= {see } />  */}
    <h1>이미지 미리보기</h1>
      <table>
        <tbody>
          <tr>
            <th>이미지</th>
            <td>
              <div>
                {fileImage && (
                  <img
                    alt="sample"
                    src={URL.createObjectURL(fileImage)}
                    style={{ margin: "auto" }}
                  />
                )}
                {fileImage && (
                <audio src={URL.createObjectURL(fileImage)} autoplay loop controls>오디오 지원되지 않는 브라우저</audio>
                )}
                <div
                  style={{
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <input
                    name="imgUpload"
                    type="file"
                    // accept="image/*"
                    onChange={saveFileImage}
                  />

                  <button
                    style={{
                      backgroundColor: "gray",
                      color: "white",
                      width: "55px",
                      height: "40px",
                      cursor: "pointer",
                    }}
                    onClick={uploadFileImage}
                  >
                    등록
                  </button>
                  <button
                    style={{
                      backgroundColor: "gray",
                      color: "white",
                      width: "55px",
                      height: "40px",
                      cursor: "pointer",
                    }}
                    onClick={ deleteFileImage}
                  >
                    삭제
                  </button>
                </div>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </>
  );
};

export default ImgUpload;

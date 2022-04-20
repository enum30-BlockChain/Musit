import React,{useEffect,useState,forwardRef} from 'react';
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
const fakeFetch = (delay = 1500) => new Promise(res => setTimeout(res, delay));

const Alert = forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
export default function Message(props) {
  const music = useSelector(state => state.music)
  const [open, setOpen] = useState(false);
  const [secondopen, setSecondOpen] = useState(false);
  const navigate = useNavigate();

  const handleClick = () => {
    setOpen(true);
  };
  const handleClick2 = () => {
    setSecondOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
    setSecondOpen(false);
  };

  useEffect(() => {
    const init = async () => {
    if (props.test){
        if(music.errorMsg.length>0){
          handleClick()
        }else{
          handleClick2()
          await fakeFetch()
          navigate("/artist/myupload", { state:props.title });
        }
      }
    }
    init()
  }, [props])
  
  return (
    <Stack spacing={2} sx={{ width: '100%' }}>
      <Snackbar open={open} autoHideDuration={10000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error" sx={{ top:"35%",left:"43%",position: 'fixed' ,width:500 }}>
          등록이 완료된 음원이거나 upload error가 발생하였습니다.
        </Alert>
      </Snackbar>
      <Snackbar open={secondopen} autoHideDuration={10000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{top:"35%",left:"43%",position: 'fixed' ,width:500 }}>
          음원이 정상등록되었습니다.
        </Alert>
      </Snackbar>
    </Stack>
  );
}

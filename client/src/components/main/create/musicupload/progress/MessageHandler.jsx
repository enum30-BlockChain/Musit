import React,{useEffect,useState,forwardRef} from 'react';
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { useDispatch, useSelector } from "react-redux";

const Alert = forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
export default function Message(props) {
  const music = useSelector(state => state.music)
  const [open, setOpen] = useState(false);
  const [secondopen, setSecondOpen] = useState(false);

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
    if (props.test){
      console.log(music.errorMsg.length)
      if(music.errorMsg.length>0){
        console.log(111111111)
        handleClick()
      }else{
        console.log(22222222222222)
        handleClick2()
      }
    }
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
      {/* <Alert severity="error">This is an error message!</Alert>
      <Alert severity="success">This is a success message!</Alert> */}
    </Stack>
  );
}

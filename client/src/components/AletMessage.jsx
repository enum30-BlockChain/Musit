import React, { useEffect, useState, forwardRef } from "react";
import Stack from "@mui/material/Stack";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const fakeFetch = (delay = 1500) =>
  new Promise((res) => setTimeout(res, delay));

const Alert = forwardRef(function Alert(props, ref) {   //먼지잘모르겠음
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function AletMessage(props) {
  const [open, setOpen] = useState(true);
  const [secondopen, setSecondOpen] = useState(true);
  const navigate = useNavigate();

  const handleClick = () => {
    setOpen(true);
  };
  const handleClick2 = () => {
    setSecondOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
    setSecondOpen(false);
  };

  useEffect(() => {
    const init = async () => {
      if (props.onoff) {  //modal띄우게 해줄값
        if (music.errorMsg.length > 0) {
          handleClick();
        } else {
          handleClick2();
          await fakeFetch();
        }
      }
    };
    init();
  }, [props]);

  return (
    <Stack spacing={2} sx={{ width: "100%" }}>
      <Snackbar open={open} autoHideDuration={10000} onClose={handleClose}>
        <Alert
          onClose={handleClose}
          severity="error"
          sx={{ top: "2%", left: "34%", position: "fixed", width: 740 }}
        >
        {props.message}
        </Alert>
      </Snackbar>
      <Snackbar
        open={secondopen}
        autoHideDuration={10000}
        onClose={handleClose}
      >
        <Alert
          onClose={handleClose}
          severity="success"
          sx={{ top: "2%", left: "34%", position: "fixed", width: 740 }}
        >
          {props.message}
        </Alert>
      </Snackbar>
    </Stack>
  );
}

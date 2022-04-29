import React, { useEffect, useState, forwardRef } from "react";
import Stack from "@mui/material/Stack";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

const Alert = forwardRef(function Alert(props, ref) {  
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function AletMessage(props) {
  const [open, setOpen] = useState(false);
  const [secondopen, setSecondOpen] = useState(flase);

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
      if (props.error) {
        handleClick();
      } else {
        handleClick2();
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

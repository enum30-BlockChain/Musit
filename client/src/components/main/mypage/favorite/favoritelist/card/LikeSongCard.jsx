import React from "react";
import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import ButtonBase from "@mui/material/ButtonBase";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import HeadsetIcon from "@mui/icons-material/Headset";
import ThumbUpOffAltOutlinedIcon from "@mui/icons-material/ThumbUpOffAltOutlined";
import { useSelector } from "react-redux";

const Img = styled("img")({
  margin: "auto",
  display: "block",
  maxWidth: "100%",
  maxHeight: "100%",
});

export default function LikeSongCard({ favor }) {
  const likecountpost = () => {};

  return (
    <Paper
      sx={{
        alignItems: "center",
        p: 2,
        mx: 1.5,
        maxWidth: 200,
        backgroundColor: (theme) =>
          theme.palette.mode === "dark" ? "#1A2027" : "#fff",
      }}
    >
      <Grid sx={{ display: "flex", width: "100%" }}>
        <Grid item>
          <ButtonBase sx={{ width: 130, height: 130 }}>
            <Img alt="complex" src={favor.img_file} />
          </ButtonBase>
        </Grid>
        <Grid item xs={12} sx={{ ml: 1 }} sm container>
          <Grid
            item
            xs
            container
            direction="column"
            justifyContent="center"
            alignItems="flex-start"
          >
            <div style={{ width: 170, whiteSpace: "nowrap" }}>
              <Typography
                sx={{ textOverflow: "ellipsis", overflow: "hidden" }}
                gutterBottom
                variant="title"
                component="div"
              ></Typography>
            </div>
            <Typography variant="body2" gutterBottom></Typography>
            <Box sx={{ display: "flex" }}>
              <AccessTimeIcon fontSize="small" sx={{ mr: 1 }} />
              <Typography variant="body2" gutterBottom></Typography>
            </Box>
            <Box sx={{ display: "flex" }}>
              <HeadsetIcon fontSize="small" sx={{ mr: 1 }} />
              <Typography variant="body2" gutterBottom></Typography>
            </Box>

            <Box sx={{ display: "flex" }}>
              <ThumbUpOffAltOutlinedIcon
                onClick={() => {
                  likecountpost();
                }}
                sx={{ mr: 0.5 }}
                cursor="pointer"
                fontSize="small"
                value={favor.title}
              />
            </Box>
            {/* <Box sx={{ display: "flex" }}>
                <ThumbUpOffAltRoundedIcon
                  onClick={() => {
                    likecountpost();
                    setTotalLike(TotalLike - 1);
                    setFindlike("");
                  }}
                  sx={{ mr: 0.5 }}
                  cursor="pointer"
                  fontSize="small"
                />
                {TotalLike}
              </Box> */}
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
}
